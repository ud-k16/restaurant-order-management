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
      {isInOrder && !inputVisible && (
        <Text style={styles.quantityTextStyle}>{isInOrder?.quantity}</Text>
      )}
      {!inputVisible && (
        <View style={styles.ItemCardContainer}>
          <Text numberOfLines={2} style={styles.productNameStyle}>
            {productName}
          </Text>
          <Text numberOfLines={2} style={styles.productDescriptionStyle}>
            {productDescription}
          </Text>
        </View>
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

  productNameStyle: {
    fontSize: moderateScale(16),
  },
  productDescriptionStyle: {
    color: Themes.primary,
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
    top: -10,
    right: -10,
    position: "absolute",
  },
  ItemCardContainer: {
    padding: moderateScale(10),
    color: Themes.black,
    height: moderateScale(90),
    borderColor: Themes.primary,
    borderWidth: moderateScale(1),
    elevation: 6,
    backgroundColor: Themes.white,
  },
  textInputStyle: {
    height: moderateScale(90),
    backgroundColor: Themes.white,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: moderateScale(25),
    borderWidth: moderateScale(1),
    color: Themes.primary,
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
