import { useEffect, useState } from "react";
import { useOrderContext } from "../context/useOrderContext";
import { useSocketContext } from "../context/useSocketContext";

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
  const { tableId, cart, orders, setCurrentOrders } = useOrderContext();
  // socket for communication
  const { socket } = useSocketContext();

  const addItemToCart = ({ productId = "", productName, amountPerUnit }) => {
    try {
      // {productId:number,productName:string,amountPerUnit:number}
      setCurrentOrders((prev) => {
        //   retriving already available Items in cart
        const availableItems = prev.cart || [];
        // checking if the item already present or not
        const findIndex = availableItems.findIndex(
          (value) => value.productId == productId
        );
        // if present increment the quantity
        if (findIndex != -1) {
          availableItems[findIndex] = {
            ...availableItems[findIndex],
            quantity: availableItems[findIndex].quantity + 1,
          };
        }
        // else adding in the new Item
        else
          availableItems.push({
            quantity: 1,
            productId,
            productName,
            amountPerUnit,
          });
        //   updating the cart
        prev.cart = availableItems;
        return { ...prev };
      });
    } catch (error) {
      console.log(error);
    }
  };

  // function to delete Item in cart
  const deleteItemFromCart = ({ productId }) => {
    try {
      setCurrentOrders((prev) => {
        //   retriving already available cart items
        const availableItems = prev.cart || [];
        //   deleting given item from cart
        const newItemSet = availableItems.filter(
          (Item) => Item.productId !== productId
        );
        //   updating the cart
        prev.cart = newItemSet;
        return { ...prev };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantityInCart = ({ productId }) => {
    try {
      setCurrentOrders((prev) => {
        //   retriving already available Items in cart
        const availableItems = prev.cart || [];
        // checking if the item already present or not
        const findIndex = availableItems.findIndex(
          (value) => value.productId == productId
        );
        // if item already present and its quantity greater than 1 , decrement it
        if (findIndex != -1 && availableItems[findIndex].quantity > 1) {
          availableItems[findIndex] = {
            ...availableItems[findIndex],
            quantity: availableItems[findIndex].quantity - 1,
          };
          //   updating the cart
          prev.cart = availableItems;
        }
        // if quantity is one then as an act of decrement,remove the item from cart, as quantity turns 0
        else if (availableItems[findIndex].quantity == 1) {
          const newItemSet = availableItems.filter(
            (Item) => Item.productId !== productId
          );
          //   updating the cart
          prev.cart = newItemSet;
        }
        return { ...prev };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = () => {
    // clear entire cart
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

  // const confirmOrder = () => {
  //   socket.emit("updateOrderForTable", {
  //     [tableId]: cart,
  //   });
  // };

  const confirmOrder = () => {
    try {
      if (orders.has(tableId)) {
        console.log("update request for table : ", tableId);
        const availableItems = orders.get(tableId) || [];
        // checking if the item already present or not
        for (const element of cart) {
          const findIndex = availableItems.findIndex(
            (value) => value.productId == element.productId
          );
          // if item already present in order,
          // update the quantity
          if (findIndex != -1) {
            availableItems[findIndex] = {
              ...element,
              quantity: element.quantity + availableItems[findIndex].quantity,
            };
          }
          // add the item to the order
          else {
            availableItems.push(element);
          }
        }
        orders.set(tableId, availableItems);
        // update the existing order
      } else {
        orders.set(tableId, cart);
      }
    } catch (error) {}
  };
  useEffect(() => {}, []);
  return {
    ...state,
    activeTableId,
    addItemToCart,
    confirmOrder,
    decrementQuantityInCart,
    deleteItemFromCart,
    deleteCart,
    showCustomerModal,
    hideCustomerModal,
  };
};
export default useOrders;
