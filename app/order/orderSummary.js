import { useOrderContext } from "@/src/context/useOrderContext";
import { useCustomerContext } from "@/src/context/useCustomerContext";
import useCustomers from "@/src/hooks/useCustomers";
import moderateScale from "@/src/utils/responsiveScale";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import EmptyContent from "@/app/EmptyContent";
const OrderSummary = ({ tableId }) => {
  const { orders } = useOrderContext();
  const { customersData } = useCustomerContext();
  const {
    customerModelVisible,
    addCustomerDataInTable,
    hideCustomerModal,
    showCustomerModal,
  } = useCustomers();
  // get orders of the selected table
  const orderOfTheTable = orders.get(tableId);
  // calculation of sub total of all itemes present
  const subTotal = orderOfTheTable?.reduce((subTotal, product) => {
    const amount = product.quantity * product.amountPerUnit;
    return subTotal + amount;
  }, 0);
  // table customer data
  const customer = customersData?.get(tableId);
  return (
    <View style={styles.container}>
      {orderOfTheTable ? (
        <ScrollView>
          <Text>RECEIPT</Text>
          <Text>Date: {new Date().toDateString()}</Text>
          {customer?.customerName && (
            <Text>Customer: {customer?.customerName ?? ""}</Text>
          )}
          {customer?.serverName && (
            <Text>Server: {customer?.serverName ?? ""}</Text>
          )}
          <Text>Time: {new Date().toLocaleTimeString()}</Text>
          <Text>Table: {tableId}</Text>
          <View style={styles.lineStyle}></View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 0.5 }}>Qty</Text>
            <Text style={{ flex: 2 }}>Item Description</Text>
            <Text style={{ flex: 1 }}>Price</Text>
            <Text style={{ flex: 1 }}>Amount</Text>
          </View>
          <View style={styles.lineStyle}></View>

          {orderOfTheTable.map((product, index) => {
            return (
              <View style={styles.displayStack} key={index}>
                <Text style={{ flex: 0.5 }}>{product.quantity}</Text>
                <Text style={{ flex: 2 }}>{product.productName}</Text>
                <Text style={{ flex: 1 }}>{product.amountPerUnit}</Text>
                <Text style={{ flex: 1 }}>
                  {product.amountPerUnit * product.quantity}
                </Text>
              </View>
            );
          })}
          <View style={styles.lineStyle}></View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 3 }}>Sub total (Excl. GST)</Text>
            <Text style={{ flex: 1 }}>{subTotal}</Text>
          </View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 3 }}>GST @ 18%</Text>
            <Text style={{ flex: 1 }}>{10}</Text>
          </View>
          <View style={styles.lineStyle}></View>
        </ScrollView>
      ) : (
        <EmptyContent />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayStack: {
    flexDirection: "row",
  },
  lineStyle: {
    borderBottomWidth: moderateScale(1),
    borderStyle: "dashed",
    width: "100%",
  },
});
export default OrderSummary;
