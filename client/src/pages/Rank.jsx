import "./test.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Rank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state;
  const [rank, setRank] = useState();

  // Fetching data from backend
  useEffect(() => {
    axios.post("/rank", { score: score }).then((res) => {
      setRank(res.data);
    });
  }, [score]);

  // Rounded rank to the nearest hundredth
  const roundRank = Math.round(rank * 100) / 100;

  return (
    <div className="cover">
      <div className="wrapper">
        <h1 className="header">Results</h1>
        <p className="word mt-5 text-center">Your Rank : {roundRank}</p>
        <button
          className="btn btn-warning mt-5 fw-bold"
          onClick={() => {
            navigate("/");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Rank;
