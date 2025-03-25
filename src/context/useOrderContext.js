import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <OrderContext.Provider value={{ ...state, setState }}>
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
