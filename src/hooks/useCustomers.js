import { useEffect, useState } from "react";
import { useOrderContext } from "../context/useOrderContext";
// import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useCustomers = () => {
  const [state, setState] = useState({
    contactNumber: null,
    customerName: "",
    customerModelVisible: false,
  });
  const showCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: true }));
  const hideCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: false }));

  const { setCustomers } = useOrderContext();
  //   const { setItem: setLocalStorageOrders } = useAsyncStorage("ORDERS");
  // function to add items to particular tableId
  const addCustomerDataInTable = ({
    tableId,
    customerName,
    contactNumber,
    customerLocation,
  }) => {
    try {
      console.log(
        "Add customer data : ",
        tableId,
        customerName,
        contactNumber,
        customerLocation
      );

      // {productId:number,productName:string,amountPerUnit:number}
      setCustomers((prev) => {
        //   retriving already available Itemss for the particular tableId
        const availableItems = prev.get(tableId) || [];
        // checking if the item already present or not
        const findIndex = availableItems.findIndex(
          (value) => value.contactNumber == contactNumber
        );
        if (findIndex === -1) {
          availableItems.push({
            quantity: 1,
            productId,
            productName,
            amountPerUnit,
          });
          //   updating the tableId and its Items
          prev.set(tableId, availableItems);
          console.log("prev", prev);
        }
        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return {
    ...state,
    setState,
    addCustomerDataInTable,
  };
};
export default useCustomers;
