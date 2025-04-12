import { useHeaderContext } from "@/src/context/useHeaderContext";
import { useHomeContext } from "@/src/context/useHomeContext";
import { useWifiContext } from "@/src/context/useWifiContext";
import useHelpers from "@/src/utils/helperFunctions";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ToastAndroid,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Dropdown from "../../src/components/DropDown";
const Configure = () => {
  const {
    tableCount,
    menuFileName,
    menu,
    setState: setHomeState,
  } = useHomeContext();
  const { setItem: setMenu } = useAsyncStorage("menu");
  const { setItem: setTableCount } = useAsyncStorage("tableCount");
  const { handleFilePicker } = useHelpers();
  const { setState: setHeaders } = useHeaderContext();
  const { ip, port, setState: setWifiState } = useWifiContext();
  const [price, setPrice] = useState({
    product_id: null,
    amount_per_unit: null,
  });
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
  function isValidIPv4(ip) {
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  }
  function isValidPort(port) {
    const portRegex =
      /^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
    return portRegex.test(port);
  }

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const bottomPosition = keyboardHeight > 0 ? keyboardHeight : 20;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={{ fontWeight: 600, fontSize: moderateScale(20) }}>
            Table Number Configuration
          </Text>
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
          <Text style={{ fontWeight: 600, fontSize: moderateScale(20) }}>
            Upload a Menu File
          </Text>
          <View>
            <Text style={{ color: Themes.primary, fontWeight: 500 }}>
              {menuFileName}
            </Text>
            <Text
              style={styles.menuPicker}
              onPress={async () => {
                const { menu, fileName } = await handleFilePicker();
                setHomeState((prev) => ({
                  ...prev,
                  menu,
                  menuFileName: fileName,
                }));
                setMenu(JSON.stringify({ menu, menuFileName: fileName }));
              }}
            >
              Upload Menu
            </Text>
          </View>
          {menu && (
            <Text style={{ fontWeight: 600, fontSize: moderateScale(20) }}>
              Edit Menu Prices
            </Text>
          )}
          {menu && (
            <View style={{ rowGap: moderateScale(10) }}>
              <View
                style={{ flexDirection: "row", columnGap: moderateScale(10) }}
              >
                <Dropdown
                  data={menu.map((data) => data.dishes).flat()}
                  style={{
                    width: moderateScale(200),
                    justifyContent: "space-evenly",
                  }}
                  containerStyle={styles.textInputStyle}
                  labelField="product_name"
                  valueField="product_id"
                  onChange={(id) => {
                    setPrice((prev) => ({
                      ...prev,
                      product_id: id,
                    }));
                  }}
                />

                <TextInput
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setPrice((prev) => ({
                      ...prev,
                      amount_per_unit: text,
                    }));
                  }}
                />
              </View>
              <Text
                style={styles.saveButton}
                onPress={() => {
                  try {
                    const findIndex = menu.findIndex(
                      (value) => value.product_id == price.product_id
                    );
                    if (findIndex != -1) {
                      setHomeState((prev) => {
                        prev.menu[findIndex] = {
                          ...menu[findIndex],
                          product_price: price.amount_per_unit,
                        };
                        setMenu(
                          JSON.stringify({ menu: prev.menu, menuFileName })
                        );
                        return {
                          ...prev,
                        };
                      });
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Save
              </Text>
            </View>
          )}

          <Text style={{ fontWeight: 600, fontSize: moderateScale(20) }}>
            Wifi Printer Configuration
          </Text>
          <View>
            <Text>Enter Printer's IP Address</Text>
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  width: moderateScale(200),
                  textAlign: "left",
                  fontSize: moderateScale(15),
                  paddingLeft: moderateScale(5),
                },
              ]}
              defaultValue={ip}
              placeholder="IPv4"
              keyboardType="numeric"
              onEndEditing={(event) => {
                Keyboard.dismiss();
                const isValid = isValidIPv4(event.nativeEvent.text);
                isValid
                  ? setWifiState((prev) => ({
                      ...prev,
                      ip: event.nativeEvent.text,
                    }))
                  : ToastAndroid.show(
                      "Not a valid IPv4 Addrress",
                      ToastAndroid.LONG
                    );
              }}
            />
          </View>
          <View>
            <Text>Enter Printer's Port Number</Text>
            <TextInput
              style={[
                styles.textInputStyle,
                {
                  textAlign: "left",
                  fontSize: moderateScale(15),
                  paddingLeft: moderateScale(5),
                },
              ]}
              keyboardType="numeric"
              defaultValue={port ? port.toString() : ""}
              onEndEditing={(event) => {
                Keyboard.dismiss();
                const isValid = isValidPort(event.nativeEvent.text);
                isValid
                  ? setWifiState((prev) => ({
                      ...prev,
                      port: Number(event.nativeEvent.text),
                    }))
                  : ToastAndroid.show(
                      "Not a valid Port Number",
                      ToastAndroid.LONG
                    );
              }}
            />
          </View>
        </View>
      </ScrollView>

      <Text
        style={[styles.bottomAction, { bottom: -bottomPosition + 12 }]}
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
  saveButton: {
    width: moderateScale(100),
    backgroundColor: Themes.primary,
    color: Themes.white,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: moderateScale(5),
    width: moderateScale(60),
    minHeight: moderateScale(30),
  },
  displayStack: { flexDirection: "row", columnGap: moderateScale(3) },
  textInputStyle: {
    borderWidth: moderateScale(1),
    height: moderateScale(35),
    width: 100,
    textAlign: "center",
    borderRadius: moderateScale(5),
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
