import { StyleSheet, Text, View } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { Link } from "expo-router";
const TableCard = ({ tableId, onLongPress = () => {} }) => {
  return (
    <Link
      href={{ pathname: "/order/menulist", params: { tableId } }}
      onLongPress={onLongPress}
    >
      <View style={styles.container}>
        <Text>{tableId}</Text>
      </View>
    </Link>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(150),
    height: moderateScale(150),
    elevation: 6,
    backgroundColor: Themes.white,
  },
  textStyle: {
    fontSize: moderateScale(28),
    textTransform: "uppercase",
  },
});
export default TableCard;
