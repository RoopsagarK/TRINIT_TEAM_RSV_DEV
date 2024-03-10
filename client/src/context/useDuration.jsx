import { createContext, useContext, useState } from "react";

// Create the context
export const DurationContext = createContext();

// Create a context provider component
export const DurationProvider = ({ children }) => {
  const [durations, setDurations] = useState([]);
    const [percent, setPrecent] = useState(0);
    const [numberQ, setnumberQ] = useState(0);

  return (
    <DurationContext.Provider
      value={{
        durations,
        setDurations,
        percent,
        setPrecent,
        numberQ,
        setnumberQ,
      }}
    >
      {children}
    </DurationContext.Provider>
  );
};
