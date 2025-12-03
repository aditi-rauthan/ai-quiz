import { useState } from "react";

export function useRetryableRequest<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(fn: () => Promise<T>, retries = 1): Promise<T | null> {
    setLoading(true);
    setError(null);
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await fn();
        setLoading(false);
        return res;
      } catch (err: any) {
        if (i === retries) {
          setError(err.message || "Request failed");
          setLoading(false);
          return null;
        }
      }
    }
    return null;
  }

  return { loading, error, run };
}