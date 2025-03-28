import { createContext, useContext, useRef, useState } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const socket = useRef(io("ws://192.168.1.5:3000")).current;
  socket.on("connect", () => {
    console.log("Client connected successfully!");
    // Now try emitting your event
  });

  socket.on("connect_error", (error) => {
    console.error("Client connection error:", error);
  });

  socket.on("connect_timeout", (timeout) => {
    console.error("Client connection timeout:", timeout);
  });
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
