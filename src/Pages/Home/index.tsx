import { WelcomeCard } from "../../Components/welcomeCard";
import { useAppContext } from "../../Context/AppContext";
import { CategoriesPage } from "../Categories";
import { QuestionPage } from "../QuestionsPage";

export const Home = () => {
  const { userSetting, quizDetails } = useAppContext();

  if (quizDetails?.questions?.length! > 0) return <QuestionPage />;

  return userSetting?.token ? <CategoriesPage /> : <WelcomeCard />;
};
