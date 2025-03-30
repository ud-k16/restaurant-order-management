import { useState } from "react";
import { useCustomerContext } from "../context/useCustomerContext";

const useCustomers = () => {
  const [state, setState] = useState({
    contactNumber: null,
    customerName: "",
    serverName: "",
    customerModelVisible: false,
    validationError: false,
  });
  const showCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: true }));
  const hideCustomerModal = () =>
    setState((prev) => ({ ...prev, customerModelVisible: false }));
  // context storage
  const { setCustomersData } = useCustomerContext();
  // function to add user data to respective table
  const addCustomerDataInTable = ({ tableId }) => {
    try {
      console.log("Add customer data : ", tableId);
      if (!state.customerName && !state.serverName) {
        setState((prev) => ({ ...prev, validationError: true }));
        return;
      } else setState((prev) => ({ ...prev, validationError: false }));
      setCustomersData((prev) => {
        prev.set(tableId, {
          customerName: state.customerName,
          contactNumber: state.contactNumber,
          serverName: state.serverName,
        });
        return new Map(prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    setState,
    addCustomerDataInTable,
    hideCustomerModal,
    showCustomerModal,
  };
};
export default useCustomers;
