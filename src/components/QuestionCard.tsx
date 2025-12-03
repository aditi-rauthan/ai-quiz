import React from "react";
import { MCQ } from "../types";

type Props = {
  q: MCQ;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  disabled?: boolean;
};

export const QuestionCard: React.FC<Props> = ({ q, selectedIndex, onSelect, disabled }) => {
  return (
    <div className="p-4 border rounded-md bg-white">
      <h3 className="font-semibold mb-3">{q.question}</h3>
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const selected = selectedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              disabled={disabled}
              className={`w-full text-left p-2 rounded ${selected ? "bg-blue-100" : "bg-white"} border`}
            >
              <span className="mr-2 font-medium">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};