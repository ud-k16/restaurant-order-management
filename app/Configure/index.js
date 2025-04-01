import { useHomeContext } from "@/src/context/useHomeContext";
import useHelpers from "@/src/utils/helperFunctions";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { View, StyleSheet, TextInput, Text } from "react-native";
const Configure = () => {
  const { tableCount, menu, setState: setHomeState } = useHomeContext();
  const { handleFilePicker } = useHelpers();
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderTextStyle}>Table Count</Text>
      <TextInput
        style={[styles.textInputStyle]}
        keyboardType="numeric"
        value={tableCount}
        onEndEditing={(event) =>
          setHomeState((prev) => ({
            ...prev,
            tableCount: Number(event.nativeEvent.text),
          }))
        }
      />
      <Text
        onPress={async () => {
          const menu = await handleFilePicker();
          console.log(menu, "menu received");

          setHomeState((prev) => ({ ...prev, menu }));
        }}
      >
        Add Menu File
      </Text>
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
