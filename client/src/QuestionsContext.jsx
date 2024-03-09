import { createContext, useContext, useState } from 'react';

// Create the context
const QuestionContext = createContext();

// Create a context provider component
export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};

// Create a custom hook to use the context
export const useQuestionContext = () => {
  return useContext(QuestionContext);
};
