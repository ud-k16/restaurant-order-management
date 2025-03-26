import { View, StyleSheet, Text } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
const TableCard = ({ tableId }) => {
  return (
    <View style={styles.container}>
      <Text>{tableId}</Text>
    </View>
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
