import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useBluetoothContext } from "@/src/context/useBluetoothContext";
import Loader from "@/app/Loader";
import EmptyContent from "@/app/EmptyContent";
import { useEffect } from "react";
import { Text } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import { useGlobalSearchParams } from "expo-router";
const BluetoothPrintScreen = () => {
  const { tableId, receipt } = useGlobalSearchParams();
  const {
    isLoading,
    pairedDevices = [],
    getPairedBluetoothDevices,
    printInBluetoothMode,
  } = useBluetoothContext();

  useEffect(() => {
    getPairedBluetoothDevices();
  }, []);

  const ListDevices = () => {
    return (
      <View style={styles.devicesContainer}>
        <Text style={styles.headingText}>Select Printer</Text>
        {pairedDevices.length > 0 ? (
          <View>
            {pairedDevices?.map((device, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    printInBluetoothMode(device, receipt);
                  }}
                >
                  <Text style={styles.deviceCard}>{device.deviceName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <EmptyContent />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : <ListDevices />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  devicesContainer: {
    paddingHorizontal: moderateScale(15),
  },
  headingText: {
    fontSize: moderateScale(20),
    color: Themes.primary,
    // marginBottom: moderateScale(10),
    textAlign: "center",
  },
  deviceCard: {
    height: moderateScale(50),
    textAlignVertical: "center",
    fontSize: moderateScale(16),
    borderBottomWidth: moderateScale(1),
  },
});
export default BluetoothPrintScreen;
