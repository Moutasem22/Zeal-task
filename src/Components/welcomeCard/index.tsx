import { Input, message } from "antd";
import { useState } from "react";
import "./style.scss";
import { LevelsCards } from "../LevelCard";
import { Buttons } from "../../Atoms/Buttons";
import Api from "../../Network";
import { useAppContext } from "../../Context/AppContext";

export const WelcomeCard = () => {
  const { setUserSetting } = useAppContext();
  const [username, setUsername] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const [selectedLevel, setSelectedLevel] = useState<
    "easy" | "medium" | "hard"
  >();

  const handleGetToken = async () => {
    if (!!!username || !!!selectedLevel) {
      message.error("Please Enter your name and select level to start");
      return;
    }
    try {
      setLoading(true);
      const data = await Api.get(`_token.php?command=request`);

      setUserSetting({
        user: username!,
        token: data?.token,
        level: selectedLevel!,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);

      message.error("SomeThing went error please try again");
    }
  };

  return (
    <div className="welcome-levels-container">
      <div className="welcome-card-wrapper">
        <h1>Trivia Questions game</h1>
        <p> wanna be a millionaire, Let's Start!!</p>
        <div className="welcome-card-input">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Please enter your name"
          />
        </div>
        <LevelsCards
          selectedLevel={selectedLevel}
          onLevelClick={setSelectedLevel}
        />
        <span>Please Choose Questions Level</span>

        <Buttons
          classes="submit-btn"
          onClick={() => {
            handleGetToken();
          }}
          loading={loading}
        >
          Let's Start
        </Buttons>
      </div>
    </div>
  );
};
