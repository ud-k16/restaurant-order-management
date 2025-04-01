import { createContext, useContext, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useWifiContext } from "./useWifiContext";
const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    menu: null,
    tableCount: null,
  });
  const { serverOnline } = useWifiContext();
  const { getItem: getMenu } = useAsyncStorage("menu");
  const { getItem: getTableCount } = useAsyncStorage("tableCount");
  const fetchTableAndMenuAvailable = async () => {
    try {
      const menu = await getMenu();
      const tableCount = await getTableCount();
      setState((prev) => ({
        ...prev,
        menu,
        tableCount,
      }));
    } catch (error) {
    } finally {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };
  useEffect(() => {
    fetchTableAndMenuAvailable();
  }, []);

  return (
    <HomeContext.Provider value={{ ...state, setState }}>
      {children}
    </HomeContext.Provider>
  );
};
export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default HomeContextProvider;
