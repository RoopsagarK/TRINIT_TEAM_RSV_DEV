import Pagination from "@mui/material/Pagination";
import { useContext, useEffect, useState } from "react";
import Options from "../components/Options";
import { QuestionContext } from "../QuestionsContext";
import Timer from "../components/Timer";
import Alert from "@mui/material/Alert";
import { DurationContext } from "../context/useDuration";

const AssessmentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clicked, setClicked] = useState(null);
  const { questions } = useContext(QuestionContext);

  const { durations, setDurations, percent, setPrecent, numberQ, setnumberQ } =
    useContext(DurationContext);

  console.log("Questions", questions);

  // if (questions.length === 0) {
  //   return <div>Loading...</div>;
  // }
  const duration = 0.25;
  const Questions = [
    {
      question:
        "The direction in which the formal communication flows is always",
      options: [
        "A. Upward",
        "B. Downward",
        "C. Horizontal",
        "D. All of the Abcne",
      ],
    },
    {
      question: "Communiction in an organization should ideally flow",
      options: [
        "A. From top to bottom",
        "B. From bottom to top",
        "C. Both",
        "D. None of these",
      ],
    },
    {
      question:
        "Which one of the following cam10t become a type of u.Titten communication",
      options: [
        "A. P ictures and visual aids",
        "B. Meetings and conferenc es",
        "C _ Letters and suggestions",
        "D. Rules and Instructions",
      ],
    },
    {
      question:
        "Consider the following statements about comrnumcationz\n1. It is a process of interaction with people and environment\n2. Two or more individuals interact and influence the ideas, beliefs and attitudes of\neach other.\n3. They can exchange information through words: gestures, signs and symbols,\nexpressions etc _",
      options: ["A. land 2", "B. 2 and3", "C. 1 and 3", "D 122 and 3"],
    },
    {
      question:
        "Iv\\hich of the following is/are not included in the tools of verbal communication?",
      options: ["A. Listening", "B. Reading", "C. Writing", "D. Graphics"],
    },
    {
      question:
        "Iv\\hich of the follo•vving statements explain Interpersonal skills?",
      options: [
        "A. The skills that a person uses to interact with other people.",
        "B. People skills or communication skills",
        "C. It explains how people relate to one another",
        "D _ All the aboxe_",
      ],
    },
  ];
  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };
  const handleTimerEnd = () => {
    console.log("Timer has ended!");
    //navigate to dashboard
    return <Alert severity="error">Time is up!</Alert>;
  };

  return (
    <>
      {Questions.length !== 0 && (
        <div className="h-screen bg-purple-200">
          <div className="py-4 mx-24 text-2xl">
            <span className="font-bold">Question Number {currentPage}.</span>
            <br />
            {Questions[currentPage - 1]?.question}
          </div>
          <div className="absolute mx-24 right-10 top-20">
            <Timer initialMinutes={duration} onTimerEnd={handleTimerEnd} />
          </div>
          <Options
            options={Questions[currentPage - 1]?.options}
            clicked={clicked}
            setClicked={setClicked}
          />
          <div className="fixed -translate-x-1/2 bottom-4 left-1/2">
            <Pagination
              count={Questions?.length - 1}
              size="large"
              page={currentPage}
              onChange={handlePageChange}
              color="secondary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentPage;
