import { createContext, useContext, useState } from "react";
// import NetInfo from "@react-native-community/netinfo";
// import Ping from "ping";

const WifiContext = createContext();

const WifiContextProvider = ({ children }) => {
  const [state, setState] = useState({
    ip: "",
    port: "",
    printerOnline: false,
  });
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await checkPrinterStatus(state.ip);
      setState((prev) => ({ ...prev, printerOnline: status }));
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [state.ip]);

  const checkPrinterStatus = async (printerIP) => {};

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
