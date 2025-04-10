import { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import useHelpers from "@/src/utils/helperFunctions";
import NativeWifiPrinter from "@/specs/NativeWifiPrinter";
const WifiContext = createContext();

const WifiContextProvider = ({ children }) => {
  const { isConnected, isInternetReachable, type, details, isWifiEnabled } =
    useNetInfo();
  const { fetchWithTimeOut, handleResponse, handleResponseError } =
    useHelpers();

  const [state, setState] = useState({
    ip: "",
    port: null,
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
      setState((prev) => ({ ...prev, isPrinting: true }));
      NativeWifiPrinter.printBill(state.ip, state.port, receipt, (success) => {
        console.log(success);
      });
    } catch (error) {
    } finally {
      setState((prev) => ({ ...prev, isPrinting: false }));
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
