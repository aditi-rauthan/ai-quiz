import React, { createContext, useContext, useState } from "react";
import { Quiz } from "../types";

type QuizContextType = {
  quiz?: Quiz;
  setQuiz: (q?: Quiz) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);
  return <QuizContext.Provider value={{ quiz, setQuiz }}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuizContext must be used inside QuizProvider");
  return ctx;
};