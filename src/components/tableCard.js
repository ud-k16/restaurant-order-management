import { StyleSheet, Text, View } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { Link } from "expo-router";
import { useOrderContext } from "../context/useOrderContext";
const TableCard = ({ tableId, onLongPress = () => {} }) => {
  const { orders } = useOrderContext();
  return (
    <Link
      href={{ pathname: "/order/menulist", params: { tableId } }}
      onLongPress={onLongPress}
    >
      <View style={styles.container}>
        <Text style={styles.textStyle}>{tableId}</Text>
        <Text>{orders.has(tableId) && "Dining"}</Text>
      </View>
    </Link>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(160),
    height: moderateScale(80),
    elevation: 6,
    backgroundColor: Themes.white,
    borderWidth: moderateScale(1),
    borderColor: Themes.primary,
  },
  textStyle: {
    fontSize: moderateScale(20),
    fontWeight: 600,
    textTransform: "uppercase",
    color: Themes.primary,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default TableCard;
