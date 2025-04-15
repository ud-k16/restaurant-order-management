import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { useHomeContext } from "@/src/context/useHomeContext";
import moderateScale from "@/src/utils/responsiveScale";

const ProductEdit = ({ productId, productName, hideModal }) => {
  const [price, setPrice] = useState({ euro: "", cent: "" });
  const { menuFileName, menu, setState: setHomeState } = useHomeContext();
  const { setItem: setMenu } = useAsyncStorage("menu");
  const onEditConfirm = () => {
    try {
      const findIndex = menu.findIndex(
        (value) => value.product_id == productId
      );
      if (findIndex != -1) {
        setHomeState((prev) => {
          prev.menu[findIndex] = {
            ...menu[findIndex],
            product_price: `${price.euro},${price.cent}`,
          };
          setMenu(JSON.stringify({ menu: prev.menu, menuFileName }));
          return {
            ...prev,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Item Name</Text>
        <TextInput
          style={styles.textInput}
          editable={false}
          keyboardType="numeric"
          defaultValue={productName}
          onChangeText={(text) => {
            setPrice((prev) => ({
              ...prev,
              euro: text,
            }));
          }}
        />
      </View>
      <View style={styles.displayStack}>
        <TouchableOpacity>
          <Text style={styles.saveButton} onPress={hideModal}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.saveButton} onPress={onEditConfirm}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
  displayStack: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textInput: {
    width: moderateScale(200),
    textAlign: "left",
    fontSize: moderateScale(15),
    paddingLeft: moderateScale(5),
    borderWidth: moderateScale(1),
    height: moderateScale(50),
  },
});
export default ProductEdit;
