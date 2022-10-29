import "./test.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

const Test = () => {
  const [words, setWords] = useState();
  const [now, setNow] = useState(0);
  const navigate = useNavigate();

  // Fetching data from backend
  useEffect(() => {
    axios.get("/words").then((res) => {
      setWords(res.data);
    });
  }, []);

  let [isDisabled, setDisabled] = useState(false);
  let [message, setMessage] = useState("...");
  let [quesNum, setQuesNum] = useState(1);
  let [wordNum, setWordNum] = useState(0);
  let [score, setScore] = useState(0);

  // Checking the selected answer
  function checkAnswer(e) {
    if (e.target.value.toLowerCase() === words?.[wordNum].pos) {
      setMessage("Correct Answer ✔");
      setScore(score + 10);
      setNow(now + 10);
    } else {
      setMessage("Wrong Answer ❌");
      setNow(now + 10);
    }
    setDisabled(true);
  }

  // Going to the next question
  function nextWord() {
    if (quesNum < 10) {
      setQuesNum(++quesNum);
      setWordNum(++wordNum);
      setMessage("...");
      setDisabled(false);
    }
  }

  // Timer
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 0) {
        clearInterval(interval);
        sendResult();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Send Result
  function sendResult() {
    navigate("/rank", { state: { score } });
  }

  return (
    <div className="cover">
      <div className="wrapper">
        <h1 className="header">Words Test</h1>
        <ProgressBar now={now} label={`${now}%`} striped variant="success" />

        {/* Question */}
        <p className="word">
          {quesNum}- {words?.[wordNum].word}
        </p>

        {/* Answers */}
        <div className="answerBtns">
          <div className="col-sm">
            <input
              className="btn btn-warning w-50 mt-3 fw-bold"
              type="button"
              value="Noun"
              disabled={isDisabled ? "disabled" : ""}
              onClick={(e) => checkAnswer(e)}
            />
          </div>
          <div className="col-sm">
            <input
              className="btn btn-warning w-50 mt-3 fw-bold"
              type="button"
              value="Verb"
              disabled={isDisabled ? "disabled" : ""}
              onClick={(e) => checkAnswer(e)}
            />
          </div>
          <div className="col-sm">
            <input
              className="btn btn-warning w-50 mt-3 fw-bold"
              type="button"
              value="Adverb"
              disabled={isDisabled ? "disabled" : ""}
              onClick={(e) => checkAnswer(e)}
            />
          </div>
          <div className="col-sm">
            <input
              className="btn btn-warning w-50 mt-3 fw-bold"
              type="button"
              value="Adjective"
              disabled={isDisabled ? "disabled" : ""}
              onClick={(e) => checkAnswer(e)}
            />
          </div>
        </div>

        {/* Case of the selected answer*/}
        <p className="message">{message}</p>

        {/* Bottom Buttons */}
        <div className="nextBtn">
          {/* Timer */}
          <span
            className="text-secondary fw-bold border border-3 rounded-pill d-inline-block fs-5"
            style={{
              width: "100px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-stopwatch-fill"
              viewBox="0 0 19 19"
            >
              <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
            </svg>
            <span>{timer}'s</span>
          </span>
          {/* Show results */}
          <button
            className="btn btn-secondary"
            onClick={() => sendResult()}
            hidden={quesNum === 10 ? "" : "hidden"}
          >
            SHow Result
          </button>
          {/* Next question */}
          <button
            className="btn btn-secondary"
            onClick={() => nextWord()}
            hidden={quesNum === 10 ? "hidden" : ""}
            style={{ textAlign: "right" }}
          >
            Next{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 18 18"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
