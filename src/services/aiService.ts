import { AIQuestionsResponse, AIFeedbackResponse, Quiz } from "../types";
import { parseJSONSafely } from "../utils/parser";

const API_BASE = "/api/ai";

async function postJSON(path: string, body: any, retries = 1): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      const parsed = parseJSONSafely(text);
      if (parsed !== null) return parsed;
      if (attempt < retries) continue;
      throw new Error("AI returned malformed JSON");
    } catch (err) {
      if (attempt === retries) throw err;
    }
  }
}

export async function generateQuestions(topic: string): Promise<AIQuestionsResponse> {
  try {
    const body = { promptType: "generateQuestions", topic };
    const parsed = await postJSON("/generate-questions", body, 1);
    if (parsed?.questions?.length === 5) {
      return { success: true, quiz: parsed as Quiz };
    }
    return { success: false, error: "Invalid quiz shape from AI" };
  } catch (err: any) {
    return { success: false, error: err.message || "Unknown error" };
  }
}

export async function generateFeedback(topic: string, score: number): Promise<AIFeedbackResponse> {
  try {
    const parsed = await postJSON("/generate-feedback", { promptType: "generateFeedback", topic, score }, 1);
    if (parsed?.feedback) return { success: true, feedback: parsed.feedback };
    return { success: false, error: "Invalid feedback shape" };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}