import { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import NativeWifiPrinter from "@/specs/NativeWifiPrinter";
import { ToastAndroid } from "react-native";

const WifiContext = createContext();

const WifiContextProvider = ({ children }) => {
  const { isConnected, isInternetReachable, type, details, isWifiEnabled } =
    useNetInfo();

  const [state, setState] = useState({
    ip: "",
    port: 9100,
    isPrinting: false,
    isConnected: false,
    isInternetReachable: false,
    continueOffline: false,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isConnected,
      isInternetReachable,
      continueOffline: isInternetReachable && false,
    }));
  }, [isConnected, isInternetReachable]);
  const printInWifiMode = async (receipt) => {
    try {
      // console.log(receipt);
      let timeOutId;
      console.log(receipt);
      setState((prev) => ({ ...prev, isPrinting: true }));
      return new Promise((resolve, reject) => {
        NativeWifiPrinter.printBill(state.ip, state.port, receipt, (result) => {
          console.log(result.success);
          result.success
            ? ToastAndroid.show("Print sucessful", ToastAndroid.LONG)
            : ToastAndroid.show("unable to print", ToastAndroid.LONG);
          result.success ? resolve(true) : reject(false);
          // clearing timeout if any
          if (timeOutId) {
            clearTimeout(timeOutId);
          }
          // setting printing to false
          setState((prev) => ({ ...prev, isPrinting: false }));
        });
      });
    } catch (error) {
      console.log(error);
      // clear timeeout if any
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      // set is printing false
      setState((prev) => ({ ...prev, isPrinting: false }));
    } finally {
      timeOutId = setTimeout(() => {
        setState((prev) => ({ ...prev, isPrinting: false }));
      }, 10003);
    }
  };
  return (
    <WifiContext.Provider value={{ ...state, setState, printInWifiMode }}>
      {children}
    </WifiContext.Provider>
  );
};
export const useWifiContext = () => {
  const context = useContext(WifiContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default WifiContextProvider;
