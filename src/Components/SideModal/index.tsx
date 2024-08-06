import { useAppContext } from "../../Context/AppContext";
import Chart from "react-apexcharts";
import "./style.scss";
import { CategoriesType } from "../../Types";

export const SideModal = () => {
  const { userSetting, setUserSetting, selectedCategories } = useAppContext();

  const handleUpdateLevel = (level: "easy" | "medium" | "hard") => {
    setUserSetting({ ...userSetting, level });
  };

  const calculateTotalQuestions = () => {
    return selectedCategories?.reduce(
      (total, item) => total + (item?.questionNumber || 0),
      0
    );
  };

  const calculateTotalCorrectAnswers = () => {
    return selectedCategories?.reduce(
      (total, item) => total + (item?.correctAnswers || 0),
      0
    );
  };

  const calculateTotalSkippedQuestions = () => {
    return selectedCategories?.reduce(
      (total, item) => total + (item?.skippedQuestions || 0),
      0
    );
  };

  return (
    <div className="side-modal">
      <div className="">
        <p>{userSetting?.user}</p>
      </div>
      <div className="side-modal-levels">
        <p>Change Questions Level</p>

        <span
          className={`easy ${userSetting?.level === "easy" ? "active" : ""}`}
          onClick={() => handleUpdateLevel("easy")}
        >
          Easy
        </span>
        <span
          className={`medium ${
            userSetting?.level === "medium" ? "active" : ""
          }`}
          onClick={() => handleUpdateLevel("medium")}
        >
          Medium
        </span>
        <span
          className={`hard ${userSetting?.level === "hard" ? "active" : ""}`}
          onClick={() => handleUpdateLevel("hard")}
        >
          Hard
        </span>
      </div>

      {selectedCategories?.length && (
        <Chart
          options={{
            labels: ["Skipped", "Correct", "Error"],
            title: { text: `Question summary ${calculateTotalQuestions()} Q` },
            legend: { position: "top" },
          }}
          series={[
            calculateTotalSkippedQuestions()!,
            calculateTotalCorrectAnswers()!,
            calculateTotalQuestions()! -
              (calculateTotalSkippedQuestions()! +
                calculateTotalCorrectAnswers()!),
          ]}
          type="donut"
          width="300"
        />
      )}
    </div>
  );
};
