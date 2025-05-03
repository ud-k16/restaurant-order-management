import { createContext, useContext, useEffect, useState } from "react";
import NativeBluetoothConnection from "@/specs/NativeBluetoothConnection";
import { ToastAndroid } from "react-native";

const BluetoothContext = createContext();

const BluetoothContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isPrinting: false,
    isLoading: true,
    pairedDevices: [],
  });
  const splitNameAndMAC = (str, separator) => {
    const index = str.indexOf(separator);
    if (index === -1) {
      return {};
    }
    return {
      deviceName: str.slice(0, index),
      mac: str.slice(index + separator.length),
    };
  };
  const parsePairedDevices = (devicesList) => {
    try {
      let devices = [],
        tempStore;
      if (devicesList) {
        tempStore = devicesList.split(",");
        for (const device of tempStore) {
          devices.push(splitNameAndMAC(device, ":"));
        }
      }
      return devices;
    } catch (error) {
      console.log(error);
    }
  };
  const getPairedBluetoothDevices = async () => {
    // console.log("getPairedBluetoothDevices function invoked");
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const deviceListString =
        await NativeBluetoothConnection.getPairedDevices();
      const devicesResult = parsePairedDevices(deviceListString);
      setState((prev) => ({
        ...prev,
        pairedDevices: devicesResult,
      }));
      // return result;
    } catch (error) {
      console.log("Bluetooth error", error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };
  const printInBluetoothMode = async (device, receipt) => {
    console.log("print in bluetooth model", device, receipt);
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const isPrinted = await NativeBluetoothConnection.printEscPos(
        device.mac,
        "",
        receipt
      );
      if (isPrinted) {
        ToastAndroid.show("Receipt printed", ToastAndroid.LONG);
        return true;
      }
    } catch (error) {
      console.log("Bluetooth error", error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
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
