import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { router } from "expo-router";
const Failure = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="report-gmailerrorred" size={44} color={"red"} />
      <Text style={styles.textStyle}>Order Failed</Text>
      <Pressable
        style={styles.backButton}
        onPress={() => {
          router.dismissAll();
        }}
      >
        <Text>Back</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    color: Themes.red,
  },
  textStyle: {
    fontWeight: 600,
    fontSize: moderateScale(20),
  },
  backButton: {
    width: moderateScale(150),
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(5),
    height: moderateScale(35),
  },
});
export default Failure;
