import { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import useHelpers from "@/src/utils/helperFunctions";
const WifiContext = createContext();

const WifiContextProvider = ({ children }) => {
  const { isConnected, isInternetReachable, type, details, isWifiEnabled } =
    useNetInfo();
  const { fetchWithTimeOut, handleResponse, handleResponseError } =
    useHelpers();

  const [state, setState] = useState({
    ip: "192.168.1.5",
    port: "5000",
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
  const printInWifiMode = async (receipt = "") => {
    try {
      setState((prev) => ({ ...prev, isPrinting: true }));

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: receipt,
      };
      const url = `http://${state.ip}:${state.port}`;
      const response = await fetchWithTimeOut({
        url,
        requestOptions,
      });
      const result = await handleResponse(response);
      console.log(result);
      return result;
    } catch (error) {
      handleResponseError(error);
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
