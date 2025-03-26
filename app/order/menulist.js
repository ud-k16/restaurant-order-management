import moderateScale from "@/src/utils/responsiveScale";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Themes } from "@/src/utils/themes";
import { useState } from "react";
const MenuList = () => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const toggleCategoryVisibility = () => setCategoryVisible((prev) => !prev);
  return (
    <View style={styles.container}>
      <ScrollView>{}</ScrollView>
      <View
        style={{
          backgroundColor: Themes.primary,
          paddingVertical: moderateScale(5),
          height: moderateScale(40),
        }}
      >
        <Pressable
          style={styles.bottomArrowContainer}
          onPress={toggleCategoryVisibility}
        >
          {!categoryVisible ? (
            <AntDesign name="arrowup" size={35} color="black" />
          ) : (
            <AntDesign name="arrowdown" size={35} color="black" />
          )}
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomArrowContainer: {
    alignSelf: "center",
    borderRadius: moderateScale(30),
    borderColor: Themes.black,
    borderWidth: moderateScale(2),
    backgroundColor: Themes.white,
    position: "absolute",
    bottom: 0,
    height: moderateScale(60),
    width: moderateScale(60),
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MenuList;
