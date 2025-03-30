import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

const CustomerContextProvider = ({ children }) => {
  const [customersData, setCustomersData] = useState(new Map());

  return (
    <CustomerContext.Provider value={{ customersData, setCustomersData }}>
      {children}
    </CustomerContext.Provider>
  );
};
export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("Error using Context");
  }
  return context;
};
export default CustomerContextProvider;
