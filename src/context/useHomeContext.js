import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { MenuList } from "@/src/constants/menu";
const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    menu: null,
    menuFileName: "",
    tableCount: null,
  });

  const { getItem: getMenu } = useAsyncStorage("menu");
  const { getItem: getTableCount } = useAsyncStorage("tableCount");
  const fetchTableAndMenuAvailable = async () => {
    try {
      const menuDetail = await getMenu();
      const { menu, menuFileName } = menuDetail && JSON.parse(menuDetail);
      const tableCount = await getTableCount();
      console.log(menu, menuDetail, "<<<<<<");

      setState((prev) => ({
        ...prev,
        menu: menu ? menu : MenuList,
        // menu,
        menuFileName: menuFileName ?? "No File",
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
