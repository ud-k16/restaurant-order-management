import { View, StyleSheet } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
const OrderList = () => {
  const { orders } = useOrderContext();
  const orderAvailable = orders.entries();
  return <View style={styles.container}>{}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default OrderList;
