import { View, StyleSheet, Text } from "react-native";
import { useHomeContext } from "@/src/context/useHomeContext";
import { useWifiContext } from "@/src/context/useWifiContext";
import TableList from "@/app/order/tablelist";
import NoInternet from "@/app/NoInternet";
import Configure from "@/app/Configure";

const AppHome = () => {
  const { isLoading, menu, tableCount } = useHomeContext();
  const { isWifiEnabled, continueOffline } = useWifiContext();

  // console.log(isWifiEnabled, " :Flag Wifi");

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text>Hold on for some time</Text>
      </View>
    );
  else if (!isWifiEnabled && !continueOffline) return <NoInternet />;
  else if (!menu || !tableCount) return <Configure />;
  return <TableList />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AppHome;
