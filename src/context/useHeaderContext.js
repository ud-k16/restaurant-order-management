import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

const HeaderContextProvider = ({ children }) => {
  const [state, setState] = useState({
    currentTable: "",
    currentPage: "",
  });

  return (
    <HeaderContext.Provider value={{ ...state, setState }}>
      {children}
    </HeaderContext.Provider>
  );
};
export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default HeaderContextProvider;
