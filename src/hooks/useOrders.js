import { useEffect, useState } from "react";
import { useOrderContext } from "../context/useOrderContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useOrders = () => {
  const [state, setState] = useState({
    isLoading: false,
    snackBarVisibility: false,
    snackBarMessage: "Something went wrong",
    defaultErrorMessage: "Something went wrong",
  });
  const showSnackBar = () =>
    setState((prev) => ({ ...prev, snackBarVisibility: true }));
  const hideSnackBar = () =>
    setState((prev) => ({
      ...prev,
      snackBarVisibility: false,
      snackBarMessage: state.defaultErrorMessage,
    }));
  const { setState: setOrderContext } = useOrderContext();
  const { getItem: getAccessToken } = useAsyncStorage("ACCESS_TOKEN");

  useEffect(() => {}, []);
  return {
    ...state,
  };
};
export default useOrders;
