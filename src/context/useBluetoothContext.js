import { createContext, useContext, useEffect, useState } from "react";
import NativeBluetoothConnection from "@/specs/NativeBluetoothConnection";
import { ToastAndroid } from "react-native";

const Bluetooth = createContext();

const BluetoothProvider = ({ children }) => {
  const [state, setState] = useState({
    isPrinting: false,
  });
  const getPairedBluetoothDevices = async () => {
    const result = await NativeBluetoothConnection.getPairedDevices();
    console.log(result);
  };
  return (
    <Bluetooth.Provider
      value={{ ...state, setState, getPairedBluetoothDevices }}
    >
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
