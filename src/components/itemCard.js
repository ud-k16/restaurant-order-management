import moderateScale from "@/src/utils/responsiveScale";
import { View, StyleSheet } from "react-native";
const ItemCard = () => {
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    width: moderateScale(100),
    height: moderateScale(80),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
  },
});
export default ItemCard;
