import { View, StyleSheet } from "react-native";
import moderateScale from "../utils/responsiveScale";
import { Themes } from "../utils/themes";
import { Text } from "react-native";
const AppHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{"Order Management"}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    backgroundColor: Themes.primary,
    justifyContent: "center",
  },
  titleTextStyle: {
    color: Themes.white,
    fontSize: moderateScale(20),
    paddingLeft: moderateScale(15),
  },
});
export default AppHeader;
