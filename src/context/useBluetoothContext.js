import { createContext, useContext, useEffect, useState } from "react";
import NativeBluetoothConnection from "@/specs/NativeBluetoothConnection";
import { ToastAndroid } from "react-native";

const BluetoothContext = createContext();

const BluetoothContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isPrinting: false,
  });
  const getPairedBluetoothDevices = async () => {
    console.log("getPairedBluetoothDevices");
    try {
      const result = await NativeBluetoothConnection.getPairedDevices();
      console.log("result", result);
      return result;
    } catch (error) {
      console.log("Bluetooth error", error);
    }
  };
  const printInBluetoothMode = async (receipt) => {
    console.log("print in bluetooth model");

    const result = await getPairedBluetoothDevices();
  };
  return (
    <BluetoothContext.Provider
      value={{
        ...state,
        setState,
        getPairedBluetoothDevices,
        printInBluetoothMode,
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};
export const useBluetoothContext = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default BluetoothContextProvider;
