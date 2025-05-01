import { View, StyleSheet } from "react-native";
import { useBluetoothContext } from "@/src/context/useBluetoothContext";
import Loader from "@/app/Loader";
import EmptyContent from "@/app/EmptyContent";
import { useEffect } from "react";
import { Text } from "react-native";
const BluetoothPrintScreen = () => {
  const {
    isLoading,
    pairedDevices = [],
    getPairedBluetoothDevices,
  } = useBluetoothContext();

  useEffect(() => {
    getPairedBluetoothDevices();
  }, []);

  const ListDevices = () => {
    return (
      <View>
        {pairedDevices.length > 0 ? (
          <View>
            {pairedDevices?.map((device, index) => {
              return <Text key={index}>{device.deviceName}</Text>;
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
});
export default BluetoothPrintScreen;
