import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
} from "react-native";
import { useHomeContext } from "@/src/context/useHomeContext";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";

const ProductEdit = ({ productId, product, hideModal }) => {
  const [price, setPrice] = useState({ euro: "", cent: "" });
  const { menuFileName, menu, setState: setHomeState } = useHomeContext();
  const { setItem: setMenu } = useAsyncStorage("menu");
  console.log(product);
  const validateCents = (cents) => {
    console.log(">>>>>>>", cents);

    const regex = /^\d{2}$/; // Exactly two digits
    return regex.test(cents);
  };

  const onEditConfirm = () => {
    try {
      if (!validateCents(price.cent ? price.cent : "00")) {
        ToastAndroid.show("Enter valid cent", ToastAndroid.LONG);
        return;
      } else if (!price.euro) {
        ToastAndroid.show("Enter amount", ToastAndroid.LONG);
        return;
      }
      let foundProduct;
      const menuIndex = menu.findIndex((data) => {
        const items = data.dishes;
        foundProduct = items.find((item) => item.product_id == productId);
        return !!foundProduct;
      });

      if (menuIndex != -1) {
        setHomeState((prev) => {
          //   console.log("before,", prev.menu[menuIndex]);
          prev.menu[menuIndex] = {
            category: prev.menu[menuIndex].category,
            dishes: [
              ...prev.menu[menuIndex].dishes.filter(
                (item) => item.product_id != productId
              ),
              {
                ...foundProduct,
                product_price: `${price.euro},${
                  price.cent ? price.cent : "00"
                }`,
              },
            ],
          };
          setMenu(JSON.stringify({ menu: prev.menu, menuFileName }));
          //   console.log("after,", prev.menu[menuIndex]);
          return {
            ...prev,
          };
        });
        ToastAndroid.show("Price Updated", ToastAndroid.LONG);
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
          numberOfLines={1}
          selection={0}
          defaultValue={product?.product_name}
          onChangeText={(text) => {}}
        />
      </View>
      <View>
        <Text>Item Price</Text>
        <View style={styles.displayStack2}>
          <TextInput
            style={styles.textInputPrice}
            keyboardType="numeric"
            placeholder="euro"
            onChangeText={(text) => {
              setPrice((prev) => ({
                ...prev,
                euro: text,
              }));
            }}
          />
          <TextInput
            style={styles.textInputPrice}
            keyboardType="numeric"
            placeholder="cents"
            onChangeText={(text) => {
              setPrice((prev) => ({
                ...prev,
                cent: text,
              }));
            }}
          />
        </View>
      </View>
      <View style={styles.displayStack}>
        <TouchableOpacity>
          <Text
            style={[
              styles.saveButton,
              {
                color: Themes.primary,
                backgroundColor: Themes.white,
                borderColor: Themes.primary,
                borderWidth: moderateScale(2),
              },
            ]}
            onPress={hideModal}
          >
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
    columnGap: moderateScale(25),
    alignItems: "center",
    height: moderateScale(70),
  },
  displayStack2: {
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    width: moderateScale(200),
    textAlign: "left",
    fontSize: moderateScale(15),
    paddingLeft: moderateScale(5),
    borderWidth: moderateScale(1),
    height: moderateScale(50),
  },
  textInputPrice: {
    width: moderateScale(150),
    paddingLeft: moderateScale(5),
    borderWidth: moderateScale(1),
    height: moderateScale(50),
  },
  saveButton: {
    width: moderateScale(100),
    backgroundColor: Themes.primary,
    color: Themes.white,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: moderateScale(5),
    height: moderateScale(40),
  },
});
export default ProductEdit;
