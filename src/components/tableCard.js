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
            borderWidth: isDining ? moderateScale(2) : 0,
            backgroundColor: Themes.white,
          },
        ]}
      >
        <Text
          style={[
            styles.textStyle,
            isDining && { color: styles.onDining.color },
            isTablePressed && { color: Themes.primary },
          ]}
        >
          {tableId}
        </Text>
        {isDining && (
          <Text
            style={[
              isDining && { color: styles.onDining.color },
              isTablePressed && { color: Themes.primary },
            ]}
          >
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
    borderWidth: moderateScale(2),
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
