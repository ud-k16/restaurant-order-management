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
  //   const { setItem: setLocalStorageOrders } = useAsyncStorage("ORDERS");
  // function to add items to particular tableId
  const addItemToTable = ({
    tableId,
    productId = "",
    productName,
    amountPerUnit,
  }) => {
    try {
      // {productId:number,productName:string,amountPerUnit:number}
      setCurrentOrders((prev) => {
        //   retriving already available Itemss for the particular tableId
        const availableItems = prev.get(tableId) || [];
        // checking if the item already present or not
        const findIndex = availableItems.findIndex(
          (value) => value.productId == productId
        );
        if (findIndex != -1) {
          availableItems[findIndex] = {
            ...availableItems[findIndex],
            quantity: availableItems[findIndex].quantity + 1,
          };
        }
        //   adding in the new Item
        else
          availableItems.push({
            quantity: 1,
            productId,
            productName,
            amountPerUnit,
          });
        //   updating the tableId and its Items
        prev.set(tableId, availableItems);
        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // function to delete Item to particular tableId
  const deleteItemFromTable = ({ tableId, productId }) => {
    setCurrentOrders((prev) => {
      //   retriving already available Items for the particular tableId
      const availableItems = prev.get(tableId) || [];
      //   deleting given time Item
      const newItemSet = availableItems.filter(
        (Item) => Item.product_id !== productId
      );
      //   updating the tableId and its Items
      prev.set(tableId, newItemSet);
      return new Map(prev);
    });
  };

  useEffect(() => {}, []);
  return {
    ...state,
    addItemToTable,
    deleteItemFromTable,
  };
};
export default useOrders;
