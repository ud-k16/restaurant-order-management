import { useHeaderContext } from "@/src/context/useHeaderContext";
import { useHomeContext } from "@/src/context/useHomeContext";
import { useWifiContext } from "@/src/context/useWifiContext";
import useHelpers from "@/src/utils/helperFunctions";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
const Configure = () => {
  const { tableCount, menuFileName, setState: setHomeState } = useHomeContext();
  const { setItem: setMenu } = useAsyncStorage("menu");
  const { setItem: setTableCount } = useAsyncStorage("tableCount");
  const { handleFilePicker } = useHelpers();
  const { setState: setHeaders } = useHeaderContext();
  const { ip, port, setState: setWifiState } = useWifiContext();
  useFocusEffect(
    useCallback(() => {
      setHeaders({
        currentPage: "Settings",
      });
      return () => {
        setHeaders({ currentPage: "", currentTable: "" });
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text>No. of Tables</Text>
          <TextInput
            style={styles.textInputStyle}
            keyboardType="numeric"
            defaultValue={tableCount?.toString()}
            onEndEditing={(event) => {
              setHomeState((prev) => ({
                ...prev,
                tableCount: Number(event.nativeEvent.text),
              }));
              setTableCount(event.nativeEvent.text);
            }}
          />
        </View>
        <View>
          <Text>{menuFileName}</Text>
          <Text
            style={styles.menuPicker}
            onPress={async () => {
              const { menu, fileName } = await handleFilePicker();
              setHomeState((prev) => ({
                ...prev,
                menu,
                menuFileName: fileName,
              }));
              setMenu(JSON.stringify({ menu, fileName }));
            }}
          >
            Upload Menu
          </Text>
        </View>
        <View>
          <Text>Enter Printer's IP Address</Text>
          <TextInput
            style={[styles.textInputStyle, { width: moderateScale(200) }]}
            defaultValue={ip}
            onEndEditing={(event) => {
              setWifiState((prev) => ({
                ...prev,
                ip: event.nativeEvent.text,
              }));
            }}
          />
        </View>
        <View>
          <Text>Enter Printer's Port Number</Text>
          <TextInput
            style={styles.textInputStyle}
            keyboardType="numeric"
            defaultValue={port ? port.toString() : ""}
            onEndEditing={(event) => {
              setWifiState((prev) => ({
                ...prev,
                port: Number(event.nativeEvent.text),
              }));
            }}
          />
        </View>
        {/* <View>
          <Text>Enter Tax detail</Text>
          <View style={styles.displayStack}>
            <TextInput
              style={[styles.textInputStyle, { width: moderateScale(100) }]}
              onEndEditing={(event) => {
                setHomeState((prev) => ({
                  ...prev,
                  taxes: [...prev.taxes],
                }));
              }}
            />
            <TextInput
              style={[styles.textInputStyle, { width: moderateScale(200) }]}
              keyboardType="numeric"
              onEndEditing={(event) => {
                setHomeState((prev) => ({
                  ...prev,
                  port: Number(event.nativeEvent.text),
                }));
              }}
            />
          </View>
        </View> */}
      </View>

      <Text
        style={styles.bottomAction}
        onPress={() => {
          router.dismissAll();
        }}
      >
        View Table
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Themes.white,
  },
  contentContainer: {
    padding: moderateScale(15),
    rowGap: moderateScale(15),
  },
  displayStack: { flexDirection: "row", columnGap: moderateScale(3) },
  textInputStyle: {
    borderWidth: moderateScale(1),
    height: moderateScale(50),
    width: 100,
    textAlign: "center",
    borderRadius: moderateScale(5),
    // paddingLeft: moderateScale(10),
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
  bottomAction: {
    height: moderateScale(50),
    backgroundColor: Themes.primary,
    color: Themes.white,
    textAlign: "center",
    textAlignVertical: "center",
    bottom: 0,
    fontSize: moderateScale(20),
    position: "absolute",
    width: "100%",
  },
});
export default Configure;
