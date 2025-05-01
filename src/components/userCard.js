import { View, StyleSheet, TextInput, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Themes } from "../utils/themes";
import moderateScale from "../utils/responsiveScale";
const UserCard = ({
  validationError,
  customerName,
  serverName,
  setState,
  hideModal = () => {},
  addCustomerDataInTable = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            backgroundColor: Themes.primary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: moderateScale(20),
          }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={30}
            color={Themes.white}
          />
          <Text style={{ color: Themes.white }}>
            Customer-Server Information
          </Text>
        </View>
        <TextInput
          style={styles.textInputStyle}
          defaultValue={customerName}
          placeholder="Customer Name"
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, customerName: text }))
          }
        />
        <Text style={styles.errorText}>
          {validationError && !customerName && "Enter Customer Name"}
        </Text>
        <TextInput
          style={styles.textInputStyle}
          defaultValue={serverName}
          placeholder="Server Name"
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, serverName: text }))
          }
        />
        <Text style={styles.errorText}>
          {validationError && !serverName && "Enter Server Name"}
        </Text>
        <View style={styles.displayStack1}>
          <Text style={styles.buttonText} onPress={hideModal}>
            Cancel
          </Text>
          <Text
            style={[
              styles.buttonText,
              { backgroundColor: Themes.primary, color: Themes.white },
            ]}
            onPress={addCustomerDataInTable}
          >
            Save
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Themes.black,
    justifyContent: "center",
  },
  errorText: {
    color: Themes.red,
    margin: 0,
    paddingLeft: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  contentContainer: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: Themes.white,
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(2),

    // rowGap: moderateScale(30),
  },
  textInputStyle: {
    borderBottomWidth: moderateScale(2),
    width: "90%",
    alignSelf: "center",
    marginVertical: moderateScale(10),
  },
  displayStack1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: moderateScale(20),
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
