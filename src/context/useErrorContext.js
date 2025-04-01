import { createContext, useContext, useState } from "react";
import { ToastAndroid } from "react-native";

const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
  const showError = (message) => {
    ToastAndroid.show(
      message ?? "Something Went Wrong!, Try again",
      ToastAndroid.LONG
    );
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
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
