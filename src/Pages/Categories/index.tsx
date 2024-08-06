import { Categories } from "../../Components/Categories";
import { SideModal } from "../../Components/SideModal";
import { useAppContext } from "../../Context/AppContext";
import "./style.scss";

export const CategoriesPage = () => {
  const { setUserSetting, userSetting } = useAppContext();

  return (
    <div className="categories-side-modal">
      <SideModal />
      <Categories />
    </div>
  );
};
