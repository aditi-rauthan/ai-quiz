import React, { useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import { QuestionCard } from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

export const QuizScreen: React.FC = () => {
  const { quiz } = useQuizContext();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!quiz) {
    return <div className="p-6">No quiz loaded. Go back to topic select.</div>;
  }

  const q = quiz.questions[index];
  const selected = answers[index] ?? null;

  function setSelected(i: number) {
    const next = [...answers];
    next[index] = i;
    setAnswers(next);
  }

  function next() {
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      navigate("/result", { state: { answers } });
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <div>Topic: <strong>{quiz.topic}</strong></div>
        <div>Progress: {index + 1}/{quiz.questions.length}</div>
      </div>
      <QuestionCard q={q} selectedIndex={selected ?? null} onSelect={setSelected} />
      <div className="flex justify-between mt-4">
        <button onClick={prev} disabled={index === 0} className="px-4 py-2 border rounded">Previous</button>
        <div className="flex gap-2">
          <button onClick={() => setShowAnswer((s) => !s)} className="px-4 py-2 border rounded">Toggle Explanation</button>
          <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        </div>
      </div>
      {showAnswer && (
        <div className="mt-4 p-3 bg-gray-50 border rounded">
          <div>Answer: <strong>{String.fromCharCode(65 + q.correctIndex)}</strong></div>
          {q.explanation && <div className="mt-2 text-sm">{q.explanation}</div>}
        </div>
      )}
    </div>
  );
};
