import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropDown: {
    // marginTop: 15,
    // borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: "black",
    height: 50,
    // paddingHorizontal: 10,
    justifyContent: "center",
    elevation: 5,
    backgroundColor: "white",
  },
  optionView: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#f0f7f4",
    elevation: 5,
  },
  optionContainer: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  textStyle: {
    color: "black",
    alignSelf: "center",
  },
  labelContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
});
