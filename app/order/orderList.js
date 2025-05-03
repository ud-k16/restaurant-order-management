import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useOrderContext } from "@/src/context/useOrderContext";
import moderateScale from "@/src/utils/responsiveScale";
import OrderSummary from "@/app/order/orderSummary";
import { Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
const OrderList = () => {
  const { orders } = useOrderContext();
  const orderAvailable = Array.from(orders.entries());

  return (
    <View style={styles.container}>
      <ScrollView>
        {orderAvailable.map((data, index) => {
          const [modalVisible, setModalVisible] = useState(false);
          const showModal = () => setModalVisible(true);
          const hideModal = () => setModalVisible(false);
          const toggleVisibility = () => setModalVisible((prev) => !prev);
          return (
            <View key={index}>
              <Pressable style={styles.orderCard} onPress={toggleVisibility}>
                <Text style={styles.orderHeadingText}>{data[0]}</Text>
                {modalVisible ? (
                  <MaterialIcons name="arrow-drop-up" size={24} color="black" />
                ) : (
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color="black"
                  />
                )}
              </Pressable>
              {modalVisible && (
                // <View>
                //   {data[1].map((product, index) => {
                //     return (
                //       <View key={index}>
                //         <Text>{product.productName}</Text>
                //       </View>
                //     );
                //   })}
                // </View>
                <OrderSummary tableId={data[0]} />
              )}
              {/* </ScrollView> */}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderCard: {
    height: moderateScale(50),
    borderBottomWidth: moderateScale(1),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderHeadingText: {
    // textAlignVertical: "center",
    fontSize: moderateScale(16),
    // textAlign: "center",
  },
});
export default OrderList;
