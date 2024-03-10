import CircularWithValueLabel from "../components/CircularWithValueLabel";

const Dashboard = () => {
  const percentage = 50;
  return (
    <>
    <div className="bg-purple-200 h-screen">
      {percentage <= 50 ? (<div className="display flex flex-col justify-center items-center gap-1 p-4">
        <h1 className="text-2xl font-semibold">Congratualtions you passsed the exam 🥳</h1>
        <CircularWithValueLabel value={percentage} percentage={percentage} />
        <p className="text-xl font-semibold underline">Your score is {percentage}%</p>
      </div>): (<div>
        <h1>Sorry you failed the exam 😔</h1>
        <p>Your score is {percentage}%</p>
        </div>)}
        <div className="grid grid-cols-2 gap-4 mx-24">
          <div className="flex flex-col justify-center items-center">
            <p className='my-2 w-full h-14 bg-purple-300 py-4 px-2 border-l-4 border-purple-950 cursor-pointer'>Totoal number of questions: 10</p>
            <p className='my-2 w-full h-14 bg-purple-300 py-4 px-2 border-l-4 border-purple-950 cursor-pointer'>Number of questions attempted: 5</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className='my-2 w-full h-14 bg-purple-300 py-4 px-2 border-l-4 border-purple-950 cursor-pointer'>Number of correctly answered questions: 3</p>
            <p className='my-2 w-full h-14 bg-purple-300 py-4 px-2 border-l-4 border-purple-950 cursor-pointer'>Number of incorrectly answered questions: 2</p>
          </div>
        </div>
      <div className='text-lg w-full text-center mt-4'>Exam duration: 40 mins, Completed in: 37 mins</div>
    </div>
    </>
  )
}

export default Dashboard
