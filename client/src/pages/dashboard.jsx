import CircularWithValueLabel from "../components/CircularWithValueLabel";
import { DurationContext } from "../context/useDuration";
import { useContext } from "react";

const Dashboard = () => {
  const percentage = 60;
  return (
    <>
      <div className="h-screen bg-purple-200">
        {percentage <= 60 ? (
          <div className="flex flex-col items-center justify-center gap-1 p-4 display">
            <h1 className="text-2xl font-semibold">
              Congratualtions you passsed the exam 🥳
            </h1>
            <CircularWithValueLabel
              value={percentage}
              percentage={percentage}
            />
            <p className="text-xl font-semibold underline">
              Your score is {percentage}%
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 p-4 display">
            <h1 className="text-2xl font-semibold">
              Sorry you failed the exam 😔
            </h1>
            <p className="text-xl font-semibold underline">
              Your score is {percentage}%
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 mx-24">
          <div className="flex flex-col items-center justify-center">
            <p className="w-full px-2 py-4 my-2 bg-purple-300 border-l-4 cursor-pointer h-14 border-purple-950">
              Totoal number of questions: 10
            </p>
            <p className="w-full px-2 py-4 my-2 bg-purple-300 border-l-4 cursor-pointer h-14 border-purple-950">
              Number of questions attempted: 5
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="w-full px-2 py-4 my-2 bg-purple-300 border-l-4 cursor-pointer h-14 border-purple-950">
              Number of correctly answered questions: 3
            </p>
            <p className="w-full px-2 py-4 my-2 bg-purple-300 border-l-4 cursor-pointer h-14 border-purple-950">
              Number of incorrectly answered questions: 2
            </p>
          </div>
        </div>
        <div className="w-full mt-4 text-lg text-center">
          Exam duration: 15s, Completed in: 10s
        </div>
      </div>
    </>
  );
};

export default Dashboard;
