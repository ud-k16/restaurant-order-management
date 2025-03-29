import { View, StyleSheet, Modal } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import moderateScale from "@/src/utils/responsiveScale";
import { Themes } from "../../src/utils/themes";
import useOrders from "@/src/hooks/useOrders";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect } from "react";
import { useHeaderContext } from "../../src/context/useHeaderContext";
import { useSocketContext } from "../../src/context/useSocketContext";
import { useFocusEffect } from "expo-router";
import UserCard from "../../src/components/userCard";
const OrderSummary = () => {
  const { tableId } = useGlobalSearchParams();
  const { cart: tableOrder } = useOrderContext();
  const { socket } = useSocketContext();
  const {
    customerModelVisible,
    showCustomerModal,
    hideCustomerModal,
    addItemToTable,
    decrementQuantity,
    deleteOrder,
    deleteItemFromTable,
  } = useOrders();
  const { setState: setHeaders } = useHeaderContext();

  useFocusEffect(
    useCallback(() => {
      setHeaders({
        currentPage: "Verify",
        currentTable: tableId,
      });
      return () => {
        setHeaders({ currentPage: "", currentTable: "" });
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      {tableOrder?.map((value, index) => {
        return (
          <View style={styles.displayStack1} key={index}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="black"
              style={{ flex: 0.5 }}
              onPress={() => {
                deleteItemFromTable({ tableId, productId: value.productId });
              }}
            />
            <Text style={styles.productNameStyle} numberOfLines={1}>
              {value.productName}
            </Text>
            <View style={styles.displayStack2}>
              <Entypo
                name="minus"
                size={24}
                color="black"
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
                onPress={() => {
                  decrementQuantity({ tableId, productId: value.productId });
                }}
              />
              <Text
                style={{
                  borderWidth: moderateScale(2),
                  paddingVertical: moderateScale(3),
                  paddingHorizontal: moderateScale(10),
                }}
              >
                {value.quantity}
              </Text>
              <Entypo
                name="plus"
                size={24}
                color="black"
                style={{
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
                onPress={() => {
                  addItemToTable({ tableId, productId: value.productId });
                }}
              />
            </View>
          </View>
        );
      })}
      <Modal visible={customerModelVisible} onRequestClose={hideCustomerModal}>
        <UserCard hideModal={hideCustomerModal} />
      </Modal>
      {/* <Text style={styles.confirmButton} onPress={showCustomerModal}>
        Confirm Order
      </Text> */}
      <Text
        style={styles.confirmButton}
        onPress={() => {
          console.log("confirm order button clicked");
          const data = {
            [tableId]: tableOrder,
          };
          console.log(data);
          deleteOrder();
        }}
      >
        Confirm Order
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: moderateScale(15),
  },
  displayStack1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: moderateScale(10),
    alignItems: "center",
    width: "100%",
    height: moderateScale(40),
  },
  displayStack2: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  productNameStyle: {
    flex: 2,
    textTransform: "capitalize",
    fontSize: moderateScale(16),
  },
  confirmButton: {
    backgroundColor: Themes.primary,
    color: Themes.white,
    fontSize: moderateScale(16),
    height: moderateScale(45),
    textAlign: "center",
    textAlignVertical: "center",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
});
export default OrderSummary;
