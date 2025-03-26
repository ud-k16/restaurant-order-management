import { View, StyleSheet } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import moderateScale from "@/src/utils/responsiveScale";
import useOrders from "@/src/hooks/useOrders";
import { useGlobalSearchParams } from "expo-router/build/hooks";
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
      {tableOrder?.map((value) => {
        return (
          <View style={styles.displayStack1}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="black"
              style={{ flex: 0.5 }}
              onPress={() => {
                deleteItemFromTable({ tableId, productId: value.productId });
              }}
            />
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
                onPress={() => {
                  decrementQuantity({ tableId, productId: value.productId });
                }}
              />
              <Text
                style={{
                  borderWidth: moderateScale(2),
                  paddingVertical: moderateScale(3),
                  paddingHorizontal: moderateScale(10),
                }}
              >
                {value.quantity}
              </Text>
              <Entypo
                name="plus"
                size={24}
                color="black"
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
                onPress={() => {
                  addItemToTable({ tableId, productId: value.productId });
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(15),
  },
  displayStack1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: moderateScale(10),
    alignItems: "center",
    width: "100%",
    height: moderateScale(40),
  },
  displayStack2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  productNameStyle: {
    flex: 2,
    textTransform: "capitalize",
  },
});
export default OrderSummary;
