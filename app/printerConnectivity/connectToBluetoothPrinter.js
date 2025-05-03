import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import { useBluetoothContext } from "@/src/context/useBluetoothContext";
import Loader from "@/app/Loader";
import EmptyContent from "@/app/EmptyContent";
import { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "@/src/utils/themes";
import useOrders from "@/src/hooks/useOrders";
import { router, useGlobalSearchParams } from "expo-router";
const BluetoothPrintScreen = () => {
  const { tableId, receipt } = useGlobalSearchParams();
  const {
    isLoading,
    pairedDevices = [],
    getPairedBluetoothDevices,
    printInBluetoothMode,
  } = useBluetoothContext();
  const { deleteOrder } = useOrders();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getPairedBluetoothDevices();
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    } finally {
      setRefreshing(false);
    }
  }, []);
  useEffect(() => {
    getPairedBluetoothDevices();
  }, []);

  const ListDevices = () => {
    return (
      <View style={styles.devicesContainer}>
        <Text style={styles.headingText}>Select Printer</Text>

        <View>
          {pairedDevices?.map((device, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={async () => {
                  const parsedReceipt = JSON.parse(receipt);
                  const result = await printInBluetoothMode(
                    device,
                    parsedReceipt
                  );
                  if (result) {
                    deleteOrder(tableId);
                    router.back();
                  }
                }}
              >
                <Text style={styles.deviceCard}>{device.deviceName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading && !refreshing ? (
        <Loader />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {pairedDevices.length > 0 ? (
            <ListDevices />
          ) : (
            <EmptyContent content={"No Paired Devices"} />
          )}
        </ScrollView>
      )}
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
