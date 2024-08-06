import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState, CategoriesType, defaultState, GameState } from "../Types";

type Props = {
  userSetting: AppState;
  setUserSetting: (state: AppState) => void;
  setSelectedCategories: (state: CategoriesType[]) => void;
  selectedCategories: CategoriesType[] | null;
  selectedCatId?: number | null;
  setSelectedCatId: (state?: number) => void;
  quizDetails?: GameState;
  setQuizDetails?: any;
};

const AppContext = createContext<Props>({
  userSetting: defaultState,
  setUserSetting: () => defaultState,
  selectedCategories: [],
  setSelectedCategories: () => null,
  selectedCatId: null,
  setSelectedCatId: () => null,
  setQuizDetails: () => null,
  quizDetails: undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userSetting, setUserSetting] = useState<AppState>(() => {
    const savedSetting = localStorage.getItem("userSetting");
    return savedSetting ? JSON.parse(savedSetting) : defaultState;
  });
  const [selectedCatId, setSelectedCatId] = useState<number | null>();
  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesType[] | null
  >(() => {
    const savedCategories = localStorage.getItem("selectedCategories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const [quizDetails, setQuizDetails] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    correctedNum: 0,
    catId: undefined,
  });

  useEffect(() => {
    localStorage.setItem("userSetting", JSON.stringify(userSetting));
  }, [userSetting]);

  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  return (
    <AppContext.Provider
      value={{
        userSetting,
        selectedCategories,
        setSelectedCategories,
        setUserSetting,
        selectedCatId,
        setSelectedCatId,
        quizDetails,
        setQuizDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
