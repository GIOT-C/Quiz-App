import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import data from "../assets/data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import StartGame from "./StartGame";
import EndGame from "./EndGame";
import WinGame from "./WinGame";

interface DataType {
  id: number;
  question: string;
  probableAnswers: {
    probableAnswerOne: string;
    probableAnswerTwo: string;
    probableAnswerThree: string;
    probableAnswerFour: string;
  };
  trueAnswer: string;
  forHalveAnswer: string;
}

function Quiz() {
  const quizData: DataType[] = data;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answerIsCorrect, setAnswerIsCorrect] = useState<string>("");
  const [answerIsWrong, setAnswerIsWrong] = useState<string>("");
  const [stateForHalfAnswers, setStateForHalfAnswers] = useState<string>("");
  const [rangeForHalfAnswers, setRangeForHalfAnswers] = useState<number>(2);
  const [rangeForHelping, setRangeForHelping] = useState<number>(1);
  const [rangeForHeart, setRangeForHeart] = useState<number>(1);
  const [numberOfAnswerClick, setNumberOfAnswerClick] = useState<number>(1);
  const [numberOfHalveAnswersClick, setNumberOfHalveAnswersClick] =
    useState<number>(1);
  const [stateForStartGame, setStateForStartGame] = useState<boolean>(false);
  const [countForQuestionTime, setCountForQuestionTime] = useState<number>(120);
  const [countForNextQuestion, setCountForNextQuestion] = useState<number>(2);

  const correctAnswer = quizData[currentQuestion].trueAnswer;
  const forHalveAnswer = quizData[currentQuestion].forHalveAnswer;

  const handleAnswerClick = (selectedAnswer: string) => {
    if (numberOfAnswerClick > 0) {
      if (selectedAnswer === correctAnswer) {
        setAnswerIsCorrect(selectedAnswer);
      } else {
        setAnswerIsWrong(selectedAnswer);
        setAnswerIsCorrect(correctAnswer);
        setRangeForHeart(rangeForHeart - 1);
      }
      setNumberOfAnswerClick(numberOfAnswerClick - 1);
    } else {
      return;
    }

    if (quizData[currentQuestion].id === 15) {
      setRangeForHalfAnswers(rangeForHalfAnswers + 1);
    }

    if (quizData[currentQuestion].id === 30) {
      setRangeForHelping(rangeForHelping + 1);
    }

    if (quizData[currentQuestion].id === 45) {
      setRangeForHeart(rangeForHeart + 1);
    }
  };

  const handleHalveAnswers = () => {
    if (numberOfHalveAnswersClick > 0) {
      if (rangeForHalfAnswers > 0) {
        setRangeForHalfAnswers(rangeForHalfAnswers - 1);
      } else {
        return;
      }

      if (stateForHalfAnswers !== forHalveAnswer) {
        setStateForHalfAnswers(forHalveAnswer);
      }
      setNumberOfHalveAnswersClick(numberOfHalveAnswersClick - 1);
    } else {
      return;
    }
  };

  const handleHelping = () => {
    if (rangeForHelping > 0) {
      setRangeForHelping(rangeForHelping - 1);
      setAnswerIsCorrect(correctAnswer);
      setNumberOfAnswerClick(numberOfAnswerClick - 1);
    } else {
      return;
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setAnswerIsCorrect("");
    setAnswerIsWrong("");
    setNumberOfAnswerClick(1);
    setNumberOfHalveAnswersClick(1);
    setStateForHalfAnswers("");
    setRangeForHalfAnswers(2);
    setRangeForHelping(1);
    setRangeForHeart(1);
    setCountForQuestionTime(120);
  };

  useEffect(() => {
    if (stateForStartGame) {
      const intervalId = setInterval(() => {
        setCountForQuestionTime((prevCount) => prevCount - 1);
      }, 1000);

      if (countForQuestionTime === 0 || numberOfAnswerClick === 0) {
        clearInterval(intervalId);
      }

      if (countForQuestionTime === 0) {
        setNumberOfAnswerClick(0);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [countForQuestionTime, stateForStartGame]);

  useEffect(() => {
    if (stateForStartGame && numberOfAnswerClick === 0 && rangeForHeart >= 0) {
      const intervalId = setInterval(() => {
        setCountForNextQuestion((prevCount) => prevCount - 1);
      }, 1000);

      if (countForNextQuestion === 0) {
        clearInterval(intervalId);
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setAnswerIsCorrect("");
        setStateForHalfAnswers("");
        setNumberOfAnswerClick(1);
        setNumberOfHalveAnswersClick(1);
        setAnswerIsWrong("");
        setCountForQuestionTime(120);
        setCountForNextQuestion(2);
      }

      if (countForQuestionTime === 0) {
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [countForNextQuestion, numberOfAnswerClick]);

  return (
    <>
      {quizData[currentQuestion].id < 51 ? (
        <div className={styles.parent}>
          {!stateForStartGame ? (
            <StartGame setStateForStartGame={setStateForStartGame} />
          ) : (
            <div>
              <div className={styles.header}>
                {rangeForHeart >= 0 && countForQuestionTime > 0 ? (
                  <div className={styles.headerMainContainer}>
                    <div className={styles.headerChildContainer}>
                      <div className={styles.progressContainer}>
                        <h1>{quizData[currentQuestion].id}/50</h1>
                        <div className={styles.timerContainer}>
                          <h1
                            className={
                              countForQuestionTime <= 20
                                ? styles.timerIsRed
                                : ""
                            }
                          >
                            {countForQuestionTime < 10
                              ? `0${countForQuestionTime}`
                              : countForQuestionTime}
                          </h1>
                          <FontAwesomeIcon
                            icon={faHourglassStart}
                            className={styles.faHourglassStart}
                          />
                        </div>
                      </div>

                      <div className={styles.benefits}>
                        <div
                          className={
                            rangeForHelping === 0
                              ? styles.helpForCorrectAnswerIsZero
                              : styles.helpForCorrectAnswer
                          }
                        >
                          <FontAwesomeIcon
                            icon={faHandshakeAngle}
                            className={
                              rangeForHelping === 0
                                ? styles.faHandshakeAngleIsZero
                                : styles.faHandshakeAngle
                            }
                            onClick={() => handleHelping()}
                          />
                          <FontAwesomeIcon icon={faX} className={styles.faX} />
                          <p className={styles.rangeForHelping}>
                            {rangeForHelping}
                          </p>
                        </div>

                        <div
                          className={
                            rangeForHalfAnswers === 0
                              ? styles.halveProbableAnswersIsZero
                              : styles.halveProbableAnswers
                          }
                        >
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className={
                              rangeForHalfAnswers === 0
                                ? styles.faMagnifyingGlassIsZero
                                : styles.faMagnifyingGlass
                            }
                            onClick={() => handleHalveAnswers()}
                          />
                          <FontAwesomeIcon icon={faX} className={styles.faX} />
                          <p className={styles.rangeForHalfAnswers}>
                            {" "}
                            {rangeForHalfAnswers}
                          </p>
                        </div>

                        <div
                          className={
                            rangeForHeart <= 0
                              ? styles.heartIsZero
                              : styles.heart
                          }
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className={
                              rangeForHeart <= 0
                                ? styles.faHeartIsZero
                                : styles.faHeart
                            }
                          />
                          <FontAwesomeIcon icon={faX} className={styles.faX} />
                          <p className={styles.rangeForHeart}>
                            {rangeForHeart >= 0 ? rangeForHeart : "0"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <EndGame
                    handleRestartGame={handleRestartGame}
                    result={quizData[currentQuestion].id}
                  />
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.bodyMainContainer}>
                  <div className={styles.quizContainer}>
                    <div className={styles.question}>
                      {quizData[currentQuestion].question}
                    </div>

                    <div className={styles.probableAnswerContainer}>
                      <div
                        className={`${
                          numberOfAnswerClick === 0
                            ? styles.probableAnswerClicked
                            : styles.probableAnswer
                        }   ${
                          answerIsCorrect === "1"
                            ? styles.correctAnswer
                            : answerIsWrong === "1"
                            ? styles.wrongAnswer
                            : ""
                        }`}
                        onClick={() => handleAnswerClick("1")}
                      >
                        <p>
                          <span>ა.</span>{" "}
                          {stateForHalfAnswers === "1" ||
                          stateForHalfAnswers === "" ||
                          correctAnswer === "1"
                            ? quizData[currentQuestion].probableAnswers
                                .probableAnswerOne
                            : ""}
                        </p>
                      </div>
                      <div
                        className={`${
                          numberOfAnswerClick === 0
                            ? styles.probableAnswerClicked
                            : styles.probableAnswer
                        } ${
                          answerIsCorrect === "2"
                            ? styles.correctAnswer
                            : answerIsWrong === "2"
                            ? styles.wrongAnswer
                            : ""
                        } `}
                        onClick={() => handleAnswerClick("2")}
                      >
                        <p>
                          <span>ბ.</span>{" "}
                          {stateForHalfAnswers === "2" ||
                          stateForHalfAnswers === "" ||
                          correctAnswer === "2"
                            ? quizData[currentQuestion].probableAnswers
                                .probableAnswerTwo
                            : ""}
                        </p>
                      </div>
                      <div
                        className={`${
                          numberOfAnswerClick === 0
                            ? styles.probableAnswerClicked
                            : styles.probableAnswer
                        } ${
                          answerIsCorrect === "3"
                            ? styles.correctAnswer
                            : answerIsWrong === "3"
                            ? styles.wrongAnswer
                            : ""
                        }`}
                        onClick={() => handleAnswerClick("3")}
                      >
                        <p>
                          <span>გ.</span>{" "}
                          {stateForHalfAnswers === "3" ||
                          stateForHalfAnswers === "" ||
                          correctAnswer === "3"
                            ? quizData[currentQuestion].probableAnswers
                                .probableAnswerThree
                            : ""}
                        </p>
                      </div>
                      <div
                        className={`${
                          numberOfAnswerClick === 0
                            ? styles.probableAnswerClicked
                            : styles.probableAnswer
                        } ${
                          answerIsCorrect === "4"
                            ? styles.correctAnswer
                            : answerIsWrong === "4"
                            ? styles.wrongAnswer
                            : ""
                        }`}
                        onClick={() => handleAnswerClick("4")}
                      >
                        <p>
                          <span>დ.</span>{" "}
                          {stateForHalfAnswers === "4" ||
                          stateForHalfAnswers === "" ||
                          correctAnswer === "4"
                            ? quizData[currentQuestion].probableAnswers
                                .probableAnswerFour
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <WinGame />
      )}
    </>
  );
}

export default Quiz;
