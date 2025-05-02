import { View, StyleSheet, Dimensions } from "react-native";
import moderateScale from "../utils/responsiveScale";
import { Themes } from "../utils/themes";
import { Text } from "react-native";
import { useHeaderContext } from "../context/useHeaderContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import CustomModal from "./Modal";
const AppHeader = () => {
  const { currentTable = "", currentPage } = useHeaderContext();
  const ref = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  // for locating menu placement position
  const [position, setPosition] = useState("");

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const locatePosition = () => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setPosition({
          width: Math.floor(width),
          left: Math.floor(x),
          top: Math.floor(y) + height,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>
        {currentPage
          ? currentTable
            ? `${currentPage} ( Table No. ${currentTable} )`
            : `${currentPage}`
          : "Orders Management App"}
      </Text>
      <View ref={ref} onLayout={locatePosition} style={{ flex: 0.2 }}>
        <Ionicons
          name="menu"
          size={24}
          color={Themes.white}
          onPress={showModal}
        />
      </View>

      <CustomModal
        visibility={modalVisible}
        hideModal={hideModal}
        backdrop={false}
      >
        <View
          style={[
            styles.menuContainer,
            {
              top: position.top,
              left:
                Dimensions.get("window").width / 2 -
                (Dimensions.get("window").width -
                  position.left -
                  position.width),
            },
          ]}
        >
          <Text
            style={styles.menuItemCard}
            onPress={() => {
              router.navigate("/order/orderList");
              hideModal();
            }}
          >
            My Orders
          </Text>
          <Text
            onPress={() => {
              router.dismissAll();
              hideModal();
            }}
            style={styles.menuItemCard}
          >
            Tables
          </Text>
          <Text
            style={styles.menuItemCard}
            onPress={() => {
              router.navigate("/Configure");
              hideModal();
            }}
          >
            Settings
          </Text>
        </View>
      </CustomModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    backgroundColor: Themes.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  titleTextStyle: {
    color: Themes.white,
    fontSize: moderateScale(20),
    paddingLeft: moderateScale(15),
    flex: 1,
  },
  menuItemCard: {
    height: moderateScale(50),
    textAlignVertical: "center",
    fontSize: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    textAlign: "center",
  },
  menuContainer: {
    color: Themes.primary,
    backgroundColor: Themes.white,
    width: "50%",
    elevation: 16,
  },
});
export default AppHeader;
