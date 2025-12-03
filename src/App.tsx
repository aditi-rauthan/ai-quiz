import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TopicSelect } from "./pages/TopicSelect";
import { QuizScreen } from "./pages/QuizScreen";
import { ResultScreen } from "./pages/ResultScreen";
import { QuizProvider } from "./context/QuizContext";

export const App: React.FC = () => (
  <BrowserRouter>
    <QuizProvider>
      <Routes>
        <Route path="/" element={<TopicSelect />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </QuizProvider>
  </BrowserRouter>
);
