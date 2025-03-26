import { View, StyleSheet } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import useOrders from "@/src/hooks/useOrders";
import {
  useGlobalSearchParams,
  useSearchParams,
} from "expo-router/build/hooks";
import { Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
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
            <Text style={styles.productNameStyle}>{value.productName}</Text>
            <View style={styles.displayStack2}>
              <Entypo
                name="minus"
                size={24}
                color="black"
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
                onPress={() => {}}
              />
              <Text style={{}}>{value.quantity}</Text>
              <Entypo
                name="plus"
                size={24}
                color="black"
                onPress={() => {}}
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              />
            </View>

            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="black"
              style={{ flex: 1 }}
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
  displayStack2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  productNameStyle: {
    flex: 3,
  },
});
export default OrderSummary;
