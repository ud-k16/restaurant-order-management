import moderateScale from "@/src/utils/responsiveScale";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useOrderContext } from "../context/useOrderContext";
import { Themes } from "../utils/themes";
const ItemCard = ({
  productId,
  productName,
  amountPerUnit,
  tableId,
  onAdd = () => {},
  onDecrement = () => {},
}) => {
  const { currentOrders } = useOrderContext();
  console.log("log in item card", currentOrders, "\n", tableId);

  const tableOrder = currentOrders.get(tableId);
  const isInOrder = tableOrder?.find((value) => value.productId == productId);
  return (
    <TouchableOpacity style={styles.container} onPress={onAdd}>
      <Text style={isInOrder && styles.quantityTextStyle}>
        {isInOrder && isInOrder.quantity}
      </Text>

      <Text style={styles.productNameTextStyle}>{productName}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: moderateScale(150),
    height: moderateScale(140),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
  },
  quantityTextStyle: {
    backgroundColor: Themes.black,
    borderRadius: moderateScale(20),
    color: Themes.white,
    alignSelf: "flex-end",
    width: moderateScale(30),
    height: moderateScale(30),
    textAlign: "center",
    textAlignVertical: "center",
  },
  productNameTextStyle: {
    padding: moderateScale(10),
    fontSize: moderateScale(18),
    textTransform: "capitalize",
  },
});
export default ItemCard;
