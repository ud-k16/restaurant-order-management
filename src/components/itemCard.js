import moderateScale from "@/src/utils/responsiveScale";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useOrderContext } from "../context/useOrderContext";
const ItemCard = ({
  productId,
  productName,
  amountPerUnit,
  tableId,
  onAdd = () => {},
  onDecrement = () => {},
}) => {
  const { currentOrders } = useOrderContext();

  const tableOrder = currentOrders.get(tableId);
  const isInOrder = tableOrder?.find((value) => value.productId == productId);
  return (
    <TouchableOpacity style={styles.container} onPress={onAdd}>
      {isInOrder && <Text>{isInOrder.quantity}</Text>}
      <Text>{productName}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: moderateScale(150),
    height: moderateScale(80),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
  },
});
export default ItemCard;
