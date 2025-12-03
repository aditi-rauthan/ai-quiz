import React, { useState } from "react";
import { generateQuestions } from "../services/aiService";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

export const TopicSelect: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const { setQuiz } = useQuizContext();
  const navigate = useNavigate();

  async function start() {
    if (!topic.trim()) return alert("Please enter a topic");
    setLoading(true);
    const res = await generateQuestions(topic.trim());
    setLoading(false);
    if (res.success && res.quiz) {
      setQuiz(res.quiz);
      navigate("/quiz");
    } else {
      alert("Failed to generate quiz: " + (res.error ?? "unknown"));
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Choose a topic</h1>
      <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Wellness, JavaScript" className="w-full p-2 border mb-3 rounded" />
      <div className="flex gap-2">
        <button onClick={start} className="px-4 py-2 rounded bg-blue-600 text-white">{loading ? <Loader /> : "Generate Quiz"}</button>
      </div>
    </div>
  );
};