import { Themes } from "@/src/utils/themes";
import { View, StyleSheet, ActivityIndicator } from "react-native";
const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color={Themes.primary} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    // backgroundColor: Themes.backDrop,
    justifyContent: "center",
  },
  activityIndicatorStyle: {},
});
export default Loader;
