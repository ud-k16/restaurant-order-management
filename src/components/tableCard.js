import { StyleSheet, Text, View } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { Link } from "expo-router";
import { useOrderContext } from "../context/useOrderContext";
import { useState } from "react";
const TableCard = ({
  tableId,
  onLongPress = () => {},
  showLoader = () => {},
  hideLoader = () => {},
}) => {
  const [isTablePressed, setIsTablePressed] = useState(false);
  const { orders } = useOrderContext();
  const isDining = orders.has(tableId);
  return (
    <Link
      href={{ pathname: "/order/menulist", params: { tableId } }}
      onLongPress={onLongPress}
      onPressIn={() => {
        setIsTablePressed(true);
        showLoader();
      }}
      onPressOut={() => {
        setIsTablePressed(false);
        hideLoader();
      }}
    >
      <View
        style={[
          styles.container,
          isDining && styles.onDining,
          isTablePressed && {
            opacity: 0.7,
            // backgroundColor: Themes.backDrop,
            borderWidth: 0,
          },
        ]}
      >
        <Text
          style={[
            styles.textStyle,
            isDining && { color: styles.onDining.color },
          ]}
        >
          {tableId}
        </Text>
        {isDining && (
          <Text style={[isDining && { color: styles.onDining.color }]}>
            {"Dine-in"}
          </Text>
        )}
      </View>
    </Link>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(80),
    height: moderateScale(60),
    elevation: 6,
    backgroundColor: Themes.white,
    borderWidth: moderateScale(1),
    borderColor: Themes.primary,
  },
  onDining: {
    backgroundColor: Themes.primary,
    color: Themes.white,
  },
  textStyle: {
    fontSize: moderateScale(16),
    fontWeight: 600,
    textTransform: "uppercase",
    color: Themes.primary,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
export default TableCard;
