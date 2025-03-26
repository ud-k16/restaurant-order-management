import moderateScale from "@/src/utils/responsiveScale";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useOrderContext } from "../context/useOrderContext";
import Entypo from "@expo/vector-icons/Entypo";
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

      <Text style={styles.productNameTextStyle} numberOfLines={1}>
        {productName}
      </Text>
      {isInOrder && (
        <View style={styles.displayStack1}>
          <Entypo
            name="minus"
            size={24}
            color="white"
            style={{
              backgroundColor: Themes.black,
              flex: 1,
              borderBottomLeftRadius: moderateScale(20),
              textAlignVertical: "center",
              textAlign: "center",
            }}
            onPress={onDecrement}
            disabled={isInOrder.quantity == 0}
          />
          <Entypo
            name="plus"
            size={24}
            color="black"
            style={{
              flex: 1,
              borderTopWidth: 1,
              textAlignVertical: "center",
              textAlign: "center",
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: moderateScale(150),
    height: moderateScale(120),
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
    fontSize: moderateScale(14),
    textTransform: "capitalize",
    height: moderateScale(44),
  },
  displayStack1: {
    height: moderateScale(40),
    flexDirection: "row",
    borderBottomLeftRadius: moderateScale(25),
    borderBottomEndRadius: moderateScale(25),
    bottom: -5,
  },
});
export default ItemCard;
