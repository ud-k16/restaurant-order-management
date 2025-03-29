import { Text, TextInput } from "react-native";

import { View, StyleSheet } from "react-native";
import { useWifiContext } from "../../src/context/useWifiContext";
const ConnectToPrinterWifi = () => {
  const { setState } = useWifiContext();
  return (
    <View style={styles.container}>
      <Text>Connect To Your printer</Text>
      <TextInput
        placeholder="Enter Printers ip address"
        onChangeText={(text) => {
          setState((prev) => ({
            ...prev,
            ip: text,
          }));
        }}
      />
      <TextInput
        placeholder="Enter Printers port address"
        onChangeText={(text) => {
          setState((prev) => ({
            ...prev,
            port: text,
          }));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ConnectToPrinterWifi;
