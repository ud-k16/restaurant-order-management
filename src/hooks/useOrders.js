import { useEffect, useState } from "react";
import { useOrderContext } from "../context/useOrderContext";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";

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
      console.log("Add to table : ", tableId, productId, productName);

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
        console.log("prev", prev);

        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // function to delete Item to particular tableId
  const deleteItemFromTable = ({ tableId, productId }) => {
    console.log("delete Item from Table", tableId, productId);

    try {
      setCurrentOrders((prev) => {
        //   retriving already available Items for the particular tableId
        const availableItems = prev.get(tableId) || [];
        //   deleting given time Item
        const newItemSet = availableItems.filter(
          (Item) => Item.productId !== productId
        );
        //   updating the tableId and its Items
        prev.set(tableId, newItemSet);
        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = ({ tableId, productId }) => {
    // if quantity is Zero , logic is handled in the render that it should not call decrement
    try {
      setCurrentOrders((prev) => {
        //   retriving already available Itemss for the particular tableId
        const availableItems = prev.get(tableId) || [];
        // checking if the item already present or not
        const findIndex = availableItems.findIndex(
          (value) => value.productId == productId
        );
        if (findIndex != -1 && availableItems[findIndex].quantity > 1) {
          availableItems[findIndex] = {
            ...availableItems[findIndex],
            quantity: availableItems[findIndex].quantity - 1,
          };
          //   updating the tableId and its Items
          prev.set(tableId, availableItems);
        } else if (availableItems[findIndex].quantity == 1) {
          const newItemSet = availableItems.filter(
            (Item) => Item.productId !== productId
          );
          //   updating the tableId and its Items
          prev.set(tableId, newItemSet);
        }

        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOrder = ({ tableId }) => {
    setCurrentOrders((prev) => {
      prev.delete(tableId);
      return new Map(prev);
    });
  };
  useEffect(() => {}, []);
  return {
    ...state,
    addItemToTable,
    decrementQuantity,
    deleteItemFromTable,
    deleteOrder,
  };
};
export default useOrders;
