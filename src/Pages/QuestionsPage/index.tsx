import { useEffect, useMemo, useState } from "react";
import { Button, message } from "antd";
import { useCountdown } from "../../Hooks";
import { useAppContext } from "../../Context/AppContext";
import { GameState, shuffleAnswers } from "../../Types";
import "./style.scss";

export const QuestionPage = () => {
  const {
    userSetting,
    quizDetails,
    setQuizDetails,
    selectedCategories,
    setSelectedCategories,
  } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const currentQuestion =
    quizDetails?.questions?.[quizDetails?.currentQuestionIndex!];
  const difficultyTimes = { easy: 90, medium: 60, hard: 30 };

  const handleSkip = () => {
    if (selectedCategories?.find((item) => item?.catId === quizDetails?.catId))
      setSelectedCategories(
        selectedCategories?.map((item) => {
          if (item?.catId === quizDetails?.catId)
            return {
              ...item,
              skippedQuestions: item?.skippedQuestions! + 1,
            };

          return item;
        })
      );
    handleNextQuestion();
  };
  const timeLeft = useCountdown(
    difficultyTimes[userSetting?.level!],
    handleSkip
  );

  useEffect(() => {
    if (timeLeft === 0) handleExit();
  }, [timeLeft]);

  const handleAnswer = () => {
    if (!!!selectedAnswer) {
      message.error("You need to select answer");
      return;
    }

    setQuizDetails?.((prev: GameState) => ({
      ...prev,
      score: prev?.score! + 1,
    }));
    setSelectedAnswer("");
    if (selectedAnswer === currentQuestion?.correct_answer) {
      message.success("Correct answer!");

      if (
        selectedCategories?.find((item) => item?.catId === quizDetails?.catId)
      )
        setSelectedCategories(
          selectedCategories?.map((item) => {
            if (item?.catId === quizDetails?.catId)
              return {
                ...item,
                correctAnswers: item?.correctAnswers! + 1,
              };

            return item;
          })
        );
    } else message.error("Wrong answer!");

    handleNextQuestion();
  };

  const handleExit = () => {
    setQuizDetails?.({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      correctedNum: 0,
    });
  };

  const handleNextQuestion = () => {
    if (
      quizDetails?.currentQuestionIndex! + 1 >=
      quizDetails?.questions?.length!
    ) {
      handleExit();
      return;
    }
    setQuizDetails?.((prev: GameState) => ({
      ...prev,
      currentQuestionIndex: (prev?.currentQuestionIndex! + 1) as number,
    }));
  };

  const shuffleAnswersData = useMemo(() => {
    return shuffleAnswers([
      currentQuestion?.correct_answer,
      ...currentQuestion?.incorrect_answers!,
    ]);
  }, [currentQuestion]);

  const shuffledQuestions = useMemo(() => {
    return shuffleAnswersData?.map((answer: string) => (
      <div
        className={`question-item ${selectedAnswer === answer ? "active" : ""}`}
        onClick={() => setSelectedAnswer(answer)}
      >
        <p
          dangerouslySetInnerHTML={{
            __html: answer!,
          }}
        />
      </div>
    ));
  }, [currentQuestion, selectedAnswer]);

  return (
    <div>
      <p style={{ padding: "20px" }}>
        Question {quizDetails?.currentQuestionIndex! + 1} of{" "}
        {quizDetails?.questions?.length}
      </p>
      <div className="questions-wrapper">
        <p dangerouslySetInnerHTML={{ __html: currentQuestion?.question! }} />
        {shuffledQuestions}
        <div className="questions-action">
          <Button type="primary" onClick={handleAnswer}>
            Next
          </Button>
          <Button onClick={handleSkip}>Skip</Button>
          <Button onClick={handleExit}>Exit Quiz</Button>
        </div>
        <p>Time left: {timeLeft} seconds</p>
      </div>
    </div>
  );
};
