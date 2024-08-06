export type GameState = {
  questions?: Question[];
  currentQuestionIndex?: number;
  score?: number;
  correctedNum?: number;
  catId?: number;
  difficulty?: "easy" | "medium" | "hard";
};

export type Question = {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type AppState = {
  user: string | null;
  token: string | null;
  level: "easy" | "medium" | "hard" | null;
};

export type CategoriesType = {
  catId?: number;
  questionNumber?: number;
  correctAnswers?: number;
  level?: "easy" | "medium" | "hard";
  skippedQuestions?: number;
} | null;

export const defaultState: AppState = {
  user: null,
  token: null,
  level: null,
};

export const shuffleAnswers = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};
