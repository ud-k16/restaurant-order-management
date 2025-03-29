import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  // holds ordering table name and its respective cart and confirmed orders
  const [currentOrders, setCurrentOrders] = useState({
    tableId: "",
    cart: [],
    orders: [],
  });
  const [customers, setCustomers] = useState(
    new Map([
      [
        "T1",
        {
          contactNumber: 9999999999,
          customerName: "Green Two Dot",
        },
      ],
    ])
  );

  return (
    <OrderContext.Provider
      value={{ ...currentOrders, setCurrentOrders, customers, setCustomers }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default OrderContextProvider;
