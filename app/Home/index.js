import { View, StyleSheet, Text } from "react-native";
import { useHomeContext } from "@/src/context/useHomeContext";
import { useWifiContext } from "@/src/context/useWifiContext";
import TableList from "@/app/order/tablelist";
const AppHome = () => {
  const { isLoading, menu, tableCount } = useHomeContext();
  const { serverOnline } = useWifiContext();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Hold on for some time</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {serverOnline && menu && tableCount && <TableList />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AppHome;
