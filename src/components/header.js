import { View, StyleSheet } from "react-native";
import moderateScale from "../utils/responsiveScale";
import { Themes } from "../utils/themes";
import { Text } from "react-native";
import { useHeaderContext } from "../context/useHeaderContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
const AppHeader = () => {
  const { currentTable = "", currentPage } = useHeaderContext();
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>
        {currentPage
          ? currentTable
            ? `${currentPage} ( Table No. ${currentTable} )`
            : `${currentPage}`
          : "  Order Management"}
      </Text>
      <Ionicons
        name="settings-outline"
        size={24}
        color={Themes.white}
        style={{ flex: 0.2 }}
        onPress={() => {
          router.navigate("/Configure");
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    backgroundColor: Themes.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  titleTextStyle: {
    color: Themes.white,
    fontSize: moderateScale(20),
    paddingLeft: moderateScale(15),
    flex: 1,
  },
});
export default AppHeader;
