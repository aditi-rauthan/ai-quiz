export type MCQ = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type Quiz = {
  topic: string;
  questions: MCQ[];
};

export type AIQuestionsResponse = {
  success: boolean;
  quiz?: Quiz;
  error?: string;
};

export type AIFeedbackResponse = {
  success: boolean;
  feedback?: string;
  error?: string;
};