import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Themes } from "../utils/themes";
const UserCard = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="account-outline"
        size={24}
        color={Themes.white}
        style={{ textAlign: "center", textAlignVertical: "center" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UserCard;
