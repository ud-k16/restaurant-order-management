import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./useSocketContext";
import { router } from "expo-router";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  // holds ordering table name and its respective cart and confirmed orders
  const [currentOrders, setCurrentOrders] = useState({
    tableId: "",
    cart: [],
    orders: new Map(),
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
  // active status update logic
  // ===========================
  const { socket } = useSocketContext();
  useEffect(() => {
    socket.on("updateOrderForTable", (update) => {
      if (update) {
        console.log("order placed confirmed");
        // clear cart
        setCurrentOrders((prev) => ({ ...prev, cart: [], tableId: "" }));
        router.navigate("/publish/successful");
      } else {
        console.log("error placing order");
        router.navigate("/publish/failure");
      }
    });
  }, []);
  useEffect(() => {
    if (currentOrders.tableId) {
      socket.emit("active", currentOrders.tableId);
    }
  }, [currentOrders.tableId]);
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
