export function parseJSONSafely(text: string): any | null {
  try {
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first >= 0 && last >= first) {
      const slice = text.slice(first, last + 1);
      return JSON.parse(slice);
    }
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}