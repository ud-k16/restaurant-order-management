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
const ItemCard = ({
  productId = 0,
  productName = "",
  onAdd = () => {},
  productDescription = "",
}) => {
  const { cart: tableOrder } = useOrderContext();
  const isInOrder = tableOrder?.find((value) => value.productId == productId);
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <Pressable style={styles.container} onPress={() => setInputVisible(true)}>
      {!inputVisible && (
        <View style={styles.ItemCardContainer}>
          <Text numberOfLines={2}>{productName}</Text>
          <Text numberOfLines={2}>{productDescription}</Text>
        </View>
      )}
      {isInOrder && !inputVisible && (
        <Text style={styles.quantityTextStyle}>{isInOrder?.quantity}</Text>
      )}
      {inputVisible && (
        <View>
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
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
  },
  handler: {
    alignSelf: "center",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(7.5),
    width: moderateScale(15),
    height: moderateScale(15),
    backgroundColor: Themes.primary,
    borderColor: Themes.primary,
  },
  quantityTextStyle: {
    backgroundColor: Themes.primary,
    color: Themes.white,
    alignSelf: "flex-end",
    minWidth: moderateScale(30),
    minHeight: moderateScale(30),
    borderRadius: moderateScale(15),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: moderateScale(16),
    zIndex: 500,
    bottom: 60,
  },
  ItemCardContainer: {
    color: Themes.black,
    height: moderateScale(70),
    borderColor: Themes.primary,
    borderWidth: moderateScale(3),
  },
  textInputStyle: {
    height: moderateScale(70),
    backgroundColor: Themes.backDrop,
    textAlign: "center",
    textAlignVertical: "bottom",
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

    <Text style={styles.ItemCardContainer} numberOfLines={1}>
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
