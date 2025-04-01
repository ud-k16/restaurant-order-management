import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
  const [state, setState] = useState({
    errorVisible: false,
    errorMessage: "",
  });
  const showError = (message) => {
    setState((prev) => ({
      ...prev,
      errorVisible: true,
      errorMessage: message ?? "Something Went Wrong!, Try again",
    }));
  };

  const hideError = () =>
    setState((prev) => ({ ...prev, errorVisible: false, errorMessage: "" }));
  return (
    <ErrorContext.Provider value={{ ...state, setState, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  );
};
export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default ErrorContextProvider;
