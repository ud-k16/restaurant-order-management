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
  const { setCurrentOrders } = useOrderContext();
  const { setItem: setLocalStorageOrders } = useAsyncStorage("ORDERS");
  // function to add items to particular tableId
  const addItemsOftableId = ({ tableId, payload }) => {
    // payload is an object with format {name:"",quantity:number,unitQuantityAmount:number}
    setCurrentOrders((prev) => {
      //   retriving already available Itemss for the particular tableId
      const availableItems = prev.get(tableId) || [];
      //   adding in the new Item
      availableItems.push({
        time: payload.time,
        subject: payload.subject,
      });
      //   updating the tableId and its Items
      prev.set(tableId, availableItems);
      return new Map(prev);
    });
  };

  // function to delete Item to particular tableId
  const deleteItemOftableId = ({ tableId, name }) => {
    setCurrentOrders((prev) => {
      //   retriving already available Items for the particular tableId
      const availableItems = prev.get(tableId) || [];
      //   deleting given time Item
      const newItemSet = availableItems.filter((Item) => Item.name !== name);
      //   updating the tableId and its Items
      prev.set(tableId, newItemSet);
      return new Map(prev);
    });
  };

  useEffect(() => {}, []);
  return {
    ...state,
    addItemsOftableId,
    deleteItemOftableId,
  };
};
export default useOrders;
