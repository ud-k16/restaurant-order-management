import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useHomeContext } from "@/src/context/useHomeContext";
const ProductEdit = ({ productId, hideModal }) => {
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
  },
  displayStack: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default ProductEdit;
