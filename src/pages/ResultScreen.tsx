import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { generateFeedback } from "../services/aiService";
import { Loader } from "../components/Loader";

export const ResultScreen: React.FC = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { quiz } = useQuizContext();
  const answers = (loc.state as any)?.answers as number[] | undefined;
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => {
    if (!quiz || !answers) return 0;
    return quiz.questions.reduce((acc, q, idx) => acc + (answers[idx] === q.correctIndex ? 1 : 0), 0);
  }, [quiz, answers]);

  useEffect(() => {
    if (!quiz) return;
    async function f() {
      setLoading(true);
      const res = await generateFeedback(quiz.topic, score);
      setLoading(false);
      if (res.success) setFeedback(res.feedback ?? "Good job!");
      else setFeedback("Couldn't generate feedback. Try again.");
    }
    f();
  }, [quiz, score]);

  if (!quiz || !answers) return <div className="p-6">Missing data. Go back and take the quiz.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl mb-3">Your Result</h2>
      <div className="mb-4">Score: <strong>{score}/{quiz.questions.length}</strong></div>
      {loading ? <Loader /> : <div className="p-3 border rounded">{feedback}</div>}
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 border rounded" onClick={() => navigate("/")}>Take new quiz</button>
        <button className="px-4 py-2 border rounded" onClick={() => navigate(-1)}>Review answers</button>
      </div>
    </div>
  );
};
