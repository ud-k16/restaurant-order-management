import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { MenuList } from "@/src/constants/menu";
const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    bluetooth: true,
    menu: null,
    menuFileName: "",
    tableCount: null,
  });

  const { getItem: getMenu } = useAsyncStorage("menu");
  const { getItem: getTableCount } = useAsyncStorage("tableCount");
  const fetchTableAndMenuAvailable = async () => {
    try {
      let availableMenu = null;
      const menuDetail = await getMenu();
      console.log(menuDetail);
      if (menuDetail) availableMenu = JSON.parse(menuDetail);

      const tableCount = await getTableCount();
      console.log(availableMenu?.menuFileName, "<<<<<<");

      setState((prev) => ({
        ...prev,
        menu: availableMenu?.menu ? availableMenu?.menu : MenuList,
        // menu,
        menuFileName: availableMenu?.menuFileName ?? "No File",
        tableCount: Number(tableCount),
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
