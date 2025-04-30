import { createContext, useContext, useEffect, useState } from "react";
import NativeBluetoothConnection from "@/specs/NativeBluetoothConnection";
import { ToastAndroid } from "react-native";

const Bluetooth = createContext();

const BluetoothProvider = ({ children }) => {
  const [state, setState] = useState({
    isPrinting: false,
  });

  return (
    <Bluetooth.Provider value={{ ...state, setState }}>
      {children}
    </Bluetooth.Provider>
  );
};
export const useBluetooth = () => {
  const context = useContext(Bluetooth);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default BluetoothProvider;
