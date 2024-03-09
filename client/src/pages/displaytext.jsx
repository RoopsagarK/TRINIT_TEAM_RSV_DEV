import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Sample = [
  {
    question: " What IS a Lion",
    option: [
      { option: "Cat" },
      { option: "Dog" },
      { option: "Donkey" },
      { option: "Lion" },
    ],
  },
];

export const Test = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-5 mb-5 text-2xl">Title</h1>
      <div className="flex flex-col items-start justify-center w-3/4">
        {Sample.map((questions, index) => {
          return (
            <div className="flex flex-col items-center justify-center">
              <h1>
                {index + 1}) {questions.question}
              </h1>
              <div className="flex flex-row flex-wrap items-center justify-center">
                <FormGroup>
                  {questions.option.map((op, index) => {
                    return (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={`${String.fromCharCode(97 + index)}. ${
                          op.option
                        }`}
                      />
                    );
                  })}
                </FormGroup>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
