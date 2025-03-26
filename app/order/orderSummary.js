import { View, StyleSheet } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import useOrders from "@/src/hooks/useOrders";
import { useSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";
const OrderSummary = () => {
  const { tableId } = useSearchParams();
  const { currentOrders } = useOrderContext();
  const { addItemToTable, decrementQuantity } = useOrders();
  const tableOrder = currentOrders.get(tableId);
  console.log(tableOrder);

  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayStack1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default OrderSummary;
