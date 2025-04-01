import { useHomeContext } from "@/src/context/useHomeContext";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { View, StyleSheet, TextInput, Text } from "react-native";
const Configure = () => {
  const { tableCount, menu, setState: setHomeState } = useHomeContext();
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderTextStyle}>Table Count</Text>
      <TextInput
        style={[styles.textInputStyle]}
        keyboardType="numeric"
        value={tableCount}
        onChangeText={(text) =>
          setHomeState((prev) => ({ ...prev, tableCount: Number(text) }))
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: moderateScale(15),
    backgroundColor: Themes.white,
  },
  placeholderTextStyle: {
    marginLeft: "32%",
    bottom: moderateScale(-10),
    backgroundColor: Themes.white,
    zIndex: 500,
    width: 88,
    textAlign: "center",
    color: Themes.black,
  },
  textInputStyle: {
    borderWidth: moderateScale(1),
    height: moderateScale(50),
    width: "40%",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: moderateScale(5),
    paddingLeft: moderateScale(10),
    fontSize: moderateScale(20),
    placeholderTextStyle: {
      fontSize: moderateScale(10),
    },
  },
});
export default Configure;
