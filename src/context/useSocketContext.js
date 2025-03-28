import { createContext, useContext, useRef, useState } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const socket = useRef(io("ws://localhost:3000")).current;

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default SocketContextProvider;
