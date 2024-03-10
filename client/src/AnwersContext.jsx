import { createContext, useContext, useState } from 'react';

// Create the context
export const AnswerContext = createContext();

// Create a context provider component
const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);

  return (
    <AnswerContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerProvider;

