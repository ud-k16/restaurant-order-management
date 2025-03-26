import { View, StyleSheet } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import useOrders from "@/src/hooks/useOrders";
import {
  useGlobalSearchParams,
  useSearchParams,
} from "expo-router/build/hooks";
import { Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const OrderSummary = () => {
  const { tableId } = useGlobalSearchParams();
  const { currentOrders } = useOrderContext();
  const { addItemToTable, decrementQuantity, deleteItemFromTable } =
    useOrders();

  const tableOrder = currentOrders.get(tableId);
  console.log(tableOrder);

  return (
    <View style={styles.container}>
      {tableOrder.map((value) => {
        return (
          <View style={styles.displayStack1}>
            <Text>{value.productName}</Text>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="black"
              onPress={() => {
                deleteItemFromTable({ tableId, productId: value.productId });
              }}
            />
          </View>
        );
      })}
    </View>
  );
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
