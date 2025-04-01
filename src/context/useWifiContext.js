import { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

const WifiContext = createContext();

const WifiContextProvider = ({ children }) => {
  const { isConnected, isInternetReachable, type, details, isWifiEnabled } =
    useNetInfo();
  const [state, setState] = useState({
    ip: "",
    port: "",
    printerOnline: false,
    serverOnline: isConnected,
  });
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      serverOnline: isConnected,
    }));
  }, [isConnected]);

  return (
    <WifiContext.Provider value={{ ...state, setState }}>
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
