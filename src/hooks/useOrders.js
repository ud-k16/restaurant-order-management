import { useEffect, useState } from "react";
import { useOrderContext } from "../context/useOrderContext";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useOrders = () => {
  const [state, setState] = useState({
    isLoading: false,
    customerModelVisible: false,
    snackBarVisibility: false,
    snackBarMessage: "Something went wrong",
    defaultErrorMessage: "Something went wrong",
  });
  const showCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: true }));
  const hideCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: false }));
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
        const availableItems = prev.cart || [];
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
        prev.cart = availableItems;
        // console.log("prev", prev);

        return { ...prev };
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
        const availableItems = prev.cart || [];
        //   deleting given time Item
        const newItemSet = availableItems.filter(
          (Item) => Item.productId !== productId
        );
        //   updating the tableId and its Items
        prev.cart = newItemSet;
        return { ...prev };
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
        const availableItems = prev.cart || [];
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
          prev.cart = availableItems;
        } else if (availableItems[findIndex].quantity == 1) {
          const newItemSet = availableItems.filter(
            (Item) => Item.productId !== productId
          );
          //   updating the tableId and its Items
          prev.cart = newItemSet;
        }

        return { ...prev };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOrder = () => {
    setCurrentOrders((prev) => {
      prev.cart = [];
      return { ...prev };
    });
  };
  const activeTableId = (tableId) => {
    setCurrentOrders((prev) => {
      prev.tableId = tableId;
      return { ...prev };
    });
  };
  useEffect(() => {}, []);
  return {
    ...state,
    activeTableId,
    addItemToTable,
    decrementQuantity,
    deleteItemFromTable,
    deleteOrder,
    showCustomerModal,
    hideCustomerModal,
  };
};
export default useOrders;
