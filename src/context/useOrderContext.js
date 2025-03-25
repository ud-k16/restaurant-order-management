import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [currentOrders, setCurrentOrders] = useState(new Map());

  return (
    <OrderContext.Provider value={{ currentOrders, setCurrentOrders }}>
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
