import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import Api from "../../Network";
import "./style.scss";
import { Buttons } from "../../Atoms/Buttons";
import { Spin } from "antd";
import { CategoriesType, GameState } from "../../Types";

type Categories = {
  id: number;
  name: string;
}[];

export const Categories = () => {
  const [categories, setCategories] = useState<Categories>();
  const [loading, setLoading] = useState<boolean>();

  const {
    userSetting,
    setSelectedCatId,
    selectedCatId,
    setQuizDetails,
    setSelectedCategories,
    selectedCategories,
  } = useAppContext();

  const handleLoadCategories = async () => {
    try {
      const data = await Api.get(`_category.php`);
      setCategories(data?.trivia_categories);
    } catch (error) {}
  };

  const handleSelectRandom = () => {
    if (!categories) return;

    const randomIndex = Math.floor(Math.random() * categories.length);
    setSelectedCatId(categories[randomIndex]?.id);
  };

  useEffect(() => {
    handleLoadCategories();
  }, []);

  const handleSelectCategory = async (id: number) => {
    if (selectedCatId !== id) {
      setSelectedCatId(id);
      return;
    }

    try {
      setLoading(true);
      const q = await Api.get(
        `.php?amount=10&category=9&difficulty=${userSetting?.level}`
      );
      if (q?.results?.length === 0) return;
      const playedCategories = selectedCategories || ([] as CategoriesType[]);
      const newCat = {
        catId: id!,
        questionNumber: q?.results?.length,
        correctAnswers: 0,
        skippedQuestions: 0,
        level: userSetting?.level!,
        current: true,
      };
      setSelectedCategories([
        ...playedCategories?.map((item) => {
          return { ...item, current: false };
        }),
        newCat,
      ]);
      setQuizDetails?.((prev: GameState) => ({
        ...prev,
        questions: q?.results,
        catId: id,
      }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const isCategoryPlayed = (id: number) => {
    if (!selectedCategories) return false;
    return selectedCategories?.some(
      (cat) => cat?.catId! === id && cat?.level === userSetting?.level
    );
  };

  const getButtonTitle = (id: number) => {
    const categoryPlayed = selectedCategories?.find(
      (i) => i?.catId === id && i?.level === userSetting?.level
    );
    if (categoryPlayed)
      return `answered ${categoryPlayed?.correctAnswers} of ${categoryPlayed?.questionNumber}`;
    if (selectedCatId === id) return "Start";
    return "Select";
  };

  if (!categories)
    return (
      <div className="cat-loading">
        <Spin />
      </div>
    );

  return (
    <div className="category-container">
      <div className="category-header">
        <h3>You Choose Level {userSetting?.level}</h3>
        <div className="">
          <Buttons onClick={handleSelectRandom}>Random Select</Buttons>
        </div>
      </div>
      <div className="categories-list">
        {categories?.map((cat) => (
          <div
            key={cat?.id}
            className={`category-card-container
              ${isCategoryPlayed(cat?.id) ? "disabled" : ""} ${
              selectedCatId === cat?.id ? "active" : ""
            }`}
            onClick={() =>
              !isCategoryPlayed(cat?.id) &&
              !loading &&
              handleSelectCategory(cat?.id)
            }
          >
            <div
              key={cat?.id}
              className={`category-card ${
                selectedCatId === cat?.id ? "active" : ""
              }`}
            >
              <p>{cat?.name}</p>
            </div>
            <span className="card-action">{getButtonTitle(cat?.id)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
