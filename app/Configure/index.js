import { useHeaderContext } from "@/src/context/useHeaderContext";
import { useHomeContext } from "@/src/context/useHomeContext";
import useHelpers from "@/src/utils/helperFunctions";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
const Configure = () => {
  const { tableCount, menu, setState: setHomeState } = useHomeContext();
  const { setItem: setMenu } = useAsyncStorage("menu");
  const { setItem: setTableCount } = useAsyncStorage("tableCount");
  const { handleFilePicker } = useHelpers();
  const { setState: setHeaders } = useHeaderContext();
  useFocusEffect(
    useCallback(() => {
      setHeaders({
        currentPage: "Configuration",
      });
      return () => {
        setHeaders({ currentPage: "", currentTable: "" });
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <View>
        <Text>No. of Tables</Text>
        <TextInput
          style={styles.textInputStyle}
          keyboardType="numeric"
          value={tableCount}
          onEndEditing={(event) => {
            setHomeState((prev) => ({
              ...prev,
              tableCount: Number(event.nativeEvent.text),
            }));
            setTableCount(event.nativeEvent.text);
          }}
        />
      </View>

      <Text
        style={styles.menuPicker}
        onPress={async () => {
          const menu = await handleFilePicker();
          setHomeState((prev) => ({ ...prev, menu }));
          setMenu(JSON.stringify(menu));
        }}
      >
        Upload Menu
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(15),
    backgroundColor: Themes.white,
    rowGap: moderateScale(15),
  },

  textInputStyle: {
    borderWidth: moderateScale(1),
    height: moderateScale(50),
    width: 100,
    textAlign: "center",
    borderRadius: moderateScale(5),
    paddingLeft: moderateScale(10),
    fontSize: moderateScale(20),
  },
  menuPicker: {
    borderWidth: moderateScale(2),
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: moderateScale(5),
    height: moderateScale(30),
    backgroundColor: Themes.backDrop,
    color: Themes.white,
    width: moderateScale(200),
  },
});
export default Configure;
