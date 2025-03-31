import moderateScale from "@/src/utils/responsiveScale";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useOrderContext } from "../context/useOrderContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Themes } from "../utils/themes";
import { useState } from "react";
const ItemCard = ({ productId, productName, quantity, onAdd = () => {} }) => {
  const [addedQuantity, setAddedQuantity] = useState(quantity);
  const [inputVisible, setInputVisible] = useState(false);
  const { cart: tableOrder } = useOrderContext();
  const isInOrder = tableOrder?.find((value) => value.productId == productId);
  return (
    <View style={styles.container}>
      {!inputVisible ? (
        <View style={{ rowGap: moderateScale(15) }}>
          <Text style={styles.productNameTextStyle} numberOfLines={3}>
            {productName}
          </Text>
          {quantity && <Text style={styles.quantityTextStyle}>{quantity}</Text>}
        </View>
      ) : (
        <TextInput
          value={quantity}
          onChangeText={(text) => setAddedQuantity(text)}
          keyboardType="numeric"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    borderTopLeftRadius: moderateScale(20),
    borderTopEndRadius: moderateScale(20),
    borderWidth: moderateScale(1),
  },
  quantityTextStyle: {
    backgroundColor: Themes.primary,
    borderRadius: moderateScale(5),
    color: Themes.white,
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: moderateScale(25),
  },
  productNameTextStyle: {
    fontWeight: 600,
    fontSize: moderateScale(14),
    textTransform: "capitalize",
    color: Themes.black,
    textAlign: "center",
    textAlignVertical: "center",
    height: moderateScale(70),
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

const oldItemDesign = () => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => {
      // call a function that increments product
    }}
  >
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
          onPress={onAdd}
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
