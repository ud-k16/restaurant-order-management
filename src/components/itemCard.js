import moderateScale from "@/src/utils/responsiveScale";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useOrderContext } from "../context/useOrderContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Themes } from "../utils/themes";
import { useState } from "react";
const ItemCard = ({ productId, productName, onAdd = () => {} }) => {
  const { cart: tableOrder } = useOrderContext();
  const isInOrder = tableOrder?.find((value) => value.productId == productId);
  // const [addedQuantity, setAddedQuantity] = useState(
  //   isInOrder && isInOrder.quantity
  // );
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <Pressable
      style={styles.container}
      onLongPress={() => setInputVisible(true)}
      onPress={null}
    >
      {!inputVisible && (
        <View>
          <View
            style={{
              alignSelf: "center",
              borderWidth: moderateScale(1),
              borderRadius: moderateScale(7.5),
              width: moderateScale(15),
              height: moderateScale(15),
            }}
          ></View>
          <Text style={styles.productNameTextStyle} numberOfLines={1}>
            {productName}
          </Text>
        </View>
      )}
      {isInOrder && !inputVisible && (
        <Text style={styles.quantityTextStyle}>{isInOrder?.quantity}</Text>
      )}
      {inputVisible && (
        <TextInput
          style={styles.textInputStyle}
          defaultValue={isInOrder?.quantity}
          keyboardType="numeric"
          autoFocus={true}
          onEndEditing={(event) => {
            onAdd(Number(event.nativeEvent.text));
            setInputVisible(false);
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
  },
  quantityTextStyle: {
    backgroundColor: Themes.primary,
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
    textAlignVertical: "bottom",
    height: moderateScale(70),

    borderTopLeftRadius: moderateScale(70),
    borderTopRightRadius: moderateScale(70),
    borderWidth: moderateScale(1),
  },
  textInputStyle: {
    height: moderateScale(70),
    backgroundColor: Themes.backDrop,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    textAlign: "center",
    fontSize: moderateScale(20),
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
