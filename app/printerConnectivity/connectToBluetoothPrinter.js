import { View, StyleSheet } from "react-native";
import { useBluetoothContext } from "@/src/context/useBluetoothContext";
const BluetoothPrintScreen = () => {
  const {
    isLoading,
    pairedDevices: [],
    getPairedBluetoothDevices,
  } = useBluetoothContext();
  return <View style={styles.container}></View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default BluetoothPrintScreen;
