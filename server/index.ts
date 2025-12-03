import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;
if (!OPENAI_KEY) console.warn("OPENAI_KEY not set in environment");

function makeQuestionsPrompt(topic: string) {
  return `You are a helpful assistant that generates quiz questions in strict JSON only.
Rules:
- Output must be ONLY valid JSON, and nothing else.
- JSON schema:
  {
    "topic": "<same or normalized topic string>",
    "questions": [ { "id": "<unique id>", "question": "<text>", "options": ["a","b","c","d"], "correctIndex": <0|1|2|3>, "explanation": "<short>" }, ... ]
  }
- Provide exactly 5 questions.
- Keep question length <= 120 chars and options concise.
- Use varied difficulty (2 easy,2 medium,1 hard).
- Do not include offensive content.
- If you cannot generate 5 valid questions, return {"error": "reason"}.

Now generate the JSON for topic: "${topic}"`;
}

function makeFeedbackPrompt(topic: string, score: number) {
  return `You are an educational assistant. Input: a topic and a score (0-5).
Return ONLY JSON:
{
  "feedback": "<one paragraph personalized feedback (2-3 sentences)>",
  "tips": ["brief tip 1","tip 2"]
}
Adjust tone: encouraging and constructive. Mention the score and suggest 2 next learning steps.

Topic: ${topic}
Score: ${score}`;
}

app.post("/api/ai/generate-questions", async (req, res) => {
  const { topic } = req.body;
  const prompt = makeQuestionsPrompt(topic || "General Knowledge");
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 700,
        temperature: 0.2,
      }),
    });
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send({ error: "server error" });
  }
});

app.post("/api/ai/generate-feedback", async (req, res) => {
  const { topic, score } = req.body;
  const prompt = makeFeedbackPrompt(topic || "General Knowledge", score ?? 0);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send({ error: "server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI proxy server listening on ${PORT}`));
