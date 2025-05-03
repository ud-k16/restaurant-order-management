import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import moderateScale from "@/src/utils/responsiveScale";
import EmptyContent from "@/app/EmptyContent";
import OrderSummary from "@/app/order/orderSummary";
import { Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useCallback } from "react"; // Import useCallback

const OrderList = () => {
  const { orders } = useOrderContext();
  const orderAvailable = Array.from(orders?.entries());
  const [visibleModals, setVisibleModals] = useState({}); // State to track visibility

  const toggleVisibility = useCallback((tableId) => {
    setVisibleModals((prev) => ({
      ...prev,
      [tableId]: !prev[tableId],
    }));
  }, []);

  const hideModal = useCallback((tableId) => {
    setVisibleModals((prev) => ({
      ...prev,
      [tableId]: false,
    }));
  }, []);

  return (
    <View style={styles.container}>
      {orderAvailable?.length > 0 ? (
        <ScrollView>
          {orderAvailable.map((data, index) => {
            const tableId = data[0];
            const isModalVisible = visibleModals[tableId] || false;

            return (
              <View key={index}>
                <Pressable
                  style={styles.orderCard}
                  onPress={() => toggleVisibility(tableId)}
                >
                  <Text style={styles.orderHeadingText}>{tableId}</Text>
                  {isModalVisible ? (
                    <MaterialIcons
                      name="arrow-drop-up"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  )}
                </Pressable>
                {isModalVisible && (
                  <OrderSummary
                    tableId={tableId}
                    hideDelete={false}
                    hideModal={() => hideModal(tableId)}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptyContent content={"No Orders"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  orderCard: {
    height: moderateScale(50),
    borderBottomWidth: moderateScale(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderHeadingText: {
    fontSize: moderateScale(16),
  },
});

export default OrderList;
