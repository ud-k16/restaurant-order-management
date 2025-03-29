import { useOrderContext } from "@/src/context/useOrderContext";
import { View, StyleSheet, ScrollView, Text } from "react-native";
const OrderSummary = ({ tableId }) => {
  const { orders } = useOrderContext();
  const orderOfTheTable = orders.get(tableId);
  return (
    <View style={styles.container}>
      {orderOfTheTable && (
        <ScrollView>
          {orderOfTheTable.map((product) => {
            return (
              <View>
                <Text>{product.productName}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default OrderSummary;
