import { useState, createContext } from "react";

export const context = createContext();

function ContextProvider({ children }) {
  const [value, setValue] = useState(1);

  return (
    <context.Provider value={{ value, setValue }}>{children}</context.Provider>
  );
}

export default ContextProvider;
