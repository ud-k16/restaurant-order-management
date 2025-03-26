import { View, StyleSheet, ScrollView } from "react-native";
import { tableNames } from "../../src/constants";
import TableCard from "../../src/components/tableCard";
import moderateScale from "@/src/utils/responsiveScale";
const TableList = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {tableNames.map((value, index) => {
          return <TableCard tableId={value} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: moderateScale(20),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: moderateScale(30),
  },
});
export default TableList;
