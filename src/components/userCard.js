import { View, StyleSheet, TextInput, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Themes } from "../utils/themes";
import moderateScale from "../utils/responsiveScale";
import useCustomers from "../hooks/useCustomers";
const UserCard = () => {
  const { setState, contactNumber, customerName } = useCustomers();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name="account-outline"
          size={64}
          color={Themes.white}
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            backgroundColor: Themes.primary,
          }}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Customer Name"
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, customerName: text }))
          }
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Contact Number"
          keyboardType="name-phone-pad"
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, contactNumber: text }))
          }
        />
        <View style={styles.displayStack1}>
          <Text style={styles.buttonText}>Cancel</Text>
          <Text style={styles.buttonText}>Place Order</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.backDrop,
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    height: "40%",
    alignSelf: "center",
    backgroundColor: Themes.white,
    rowGap: moderateScale(30),
  },
  textInputStyle: {
    borderBottomWidth: moderateScale(2),
    width: "90%",
    alignSelf: "center",
  },
  displayStack1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonText: {
    width: moderateScale(100),
    borderWidth: moderateScale(2),
    height: moderateScale(40),
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: moderateScale(5),
  },
});
export default UserCard;
