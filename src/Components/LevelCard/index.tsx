import { Buttons } from "../../Atoms/Buttons";
import "./style.scss";
type Props = {
  onLevelClick: (level: "easy" | "medium" | "hard") => void;
  selectedLevel?: "easy" | "medium" | "hard";
};

export const LevelsCards = ({ onLevelClick, selectedLevel }: Props) => {
  return (
    <div className="level-cards-wrapper">
      <Buttons
        id="easy"
        classes={`easy-btn ${selectedLevel === "easy" ? "active" : ""}`}
        onClick={() => onLevelClick("easy")}
      >
        Easy
      </Buttons>
      <Buttons
        id="medium"
        classes={`medium-btn  ${selectedLevel === "medium" ? "active" : ""}`}
        onClick={() => onLevelClick("medium")}
      >
        Medium
      </Buttons>
      <Buttons
        id="hard"
        classes={`hard-btn  ${selectedLevel === "hard" ? "active" : ""}`}
        onClick={() => onLevelClick("hard")}
      >
        Hard
      </Buttons>
    </div>
  );
};
