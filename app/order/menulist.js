import moderateScale from "@/src/utils/responsiveScale";
import { View, StyleSheet, ScrollView } from "react-native";
const MenuList = () => {
  return (
    <View style={styles.container}>
      <ScrollView>{}</ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
});
export default MenuList;
