import { useRef } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import {Link} from 'react-router-dom';

export const Manual = () => {
  const [question, setQuestion] = useState([
    {
      question: "",
      option: [{ Option: "" }],
      answer: "",
    },
  ]);

  const ques = useRef();
  const opt = useRef();
  const ans = useRef();

  const AddQuestion = () => {
    setQuestion((prev) => [
      ...prev,
      {
        question: "",
        option: [{ Option: "" }],
        answer: "",
      },
    ]);
  };

  const answerHandle = (ev) => {
    const index = ev.target.id;
    setQuestion((prev) => {
      const newArray = [...prev];
      newArray[index] = {
        ...newArray[index],
        answer: ans.current.value,
      };
      return newArray;
    });
  };

  const questionHandle = (ev) => {
    console.log(ev.target.id);
    console.log(ques.current.value);
    const index = ev.target.id;
    setQuestion((prev) => {
      const newArray = [...prev];
      newArray[index] = {
        ...newArray[index],
        question: ques.current.value,
      };
      return newArray;
    });
  };

  const optionHandle = (ev) => {
    const Data = ev.target.id.split("..");
    const newOption = question[Data[0]].option;
    newOption[Data[1]].Option = opt.current.value;
    setQuestion((prev) => {
      const newArray = [...prev];
      newArray[Data[0]] = {
        ...newArray[Data[0]],
        option: newOption,
      };
      return newArray;
    });
  };

  const AddOption = (ev) => {
    console.log(ev.target.value);
    const index = ev.target.value;

    setQuestion((prev) => {
      const newArray = [...prev];
      newArray[index] = {
        ...newArray[index],
        option: [...newArray[index].option, { Option: "" }],
      };
      return newArray;
    });

    console.log(question);
  };

  console.log(question);

  return (
    <div className="flex flex-row items-center justify-center w-full bg-purple-200 min-h-[87vh]">
      <div className="w-3/4 mt-5 mb-5">
        {question.map((questions, index) => {
          return (
            <div className="mb-12 border-l-8 border-purple-900 px-1" key={index}>
              <TextField
                className="w-full"
                label="Question"
                inputRef={ques}
                id={index}
                multiline
                onChange={questionHandle}
                key={index}
                maxRows={4}
                variant="filled"
                color="secondary"
              />

              <div>
                <div className="grid grid-cols-2 mt-5 gap-3 w-full">
                {questions.option.map((option, optionindex) => {
                  return (
                    <>
                      <TextField
                        className="w-full"
                        required
                        id={`${index}..${optionindex}`}
                        inputRef={opt}
                        onChange={optionHandle}
                        label={`Option ${optionindex + 1}`}
                        variant="filled"
                        color="secondary"
                      />
                    </>
                  );
                })}
                </div>
                
                
                <div className="text-center mt-4 flex gap-5">
                <Tooltip title="Add Option" arrow>
                  <Button 
                    color="secondary" 
                    className="gradient pt-2 pb-2 pl-5 pr-5 border  border-gray-500 rounded-lg"
                    value={index}
                    sx={{ color: "white" }}
                    onClick={AddOption}
                  >
                    <AddCircleIcon />
                  </Button>
                </Tooltip>
                 <TextField
                  label="Answer"
                  fullWidth
                  onChange={answerHandle}
                  inputRef={ans}
                  id={index}
                  color="success"
                  variant="filled"
                />
                </div>
              </div>
            </div>
          );
        })}
        <Tooltip title="Add another Question" arrow>
          <div
            className="flex flex-row items-center justify-center  w-full mt-5 mb-5"
            onClick={AddQuestion}
          >
            <Button className="gradient" sx={{color: "white"}}  variant="filled">Add Question</Button>
          </div>
        </Tooltip>
        <div className="flex flex-row items-center justify-center text-purple-600">
          <Link to="/assessment">
            <Button variant="outlined" color="secondary">Submit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};