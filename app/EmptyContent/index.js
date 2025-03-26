import { View, StyleSheet, Text } from "react-native";
const EmptyContent = ({ content = "No Order Data to Display" }) => {
  return (
    <View style={styles.container}>
      <Text>{content}</Text>
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
export default EmptyContent;
