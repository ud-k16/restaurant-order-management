import { useOrderContext } from "@/src/context/useOrderContext";
import { useCustomerContext } from "@/src/context/useCustomerContext";
import useCustomers from "@/src/hooks/useCustomers";
import moderateScale from "@/src/utils/responsiveScale";
import UserCard from "@/src/components/userCard";
import { View, StyleSheet, ScrollView, Text, Modal } from "react-native";
import EmptyContent from "@/app/EmptyContent";
import { Themes } from "@/src/utils/themes";
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
  // gst
  const gst = 10;
  return (
    <View style={styles.container}>
      {orderOfTheTable ? (
        <ScrollView style={styles.scrollViewStyle}>
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
            <Text style={{ flex: 1 }}>Sub total (Excl. GST)</Text>
            <Text style={{ flex: 0.29 }}>{subTotal}</Text>
          </View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 1 }}>GST @ 18%</Text>
            <Text style={{ flex: 0.29 }}>{gst}</Text>
          </View>
          <View style={styles.lineStyle}></View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 1 }}>Total </Text>
            <Text style={{ flex: 0.29 }}>{subTotal + gst}</Text>
          </View>
          <View style={styles.lineStyle}></View>
          <Text
            style={styles.buttonStyle}
            onPress={customer?.customerName ? null : showCustomerModal}
          >
            {customer?.customerName ? "Print" : "Add Customer"}
          </Text>
          <Modal
            visible={customerModelVisible}
            onRequestClose={hideCustomerModal}
          >
            <UserCard hideModal={hideCustomerModal} tableId={tableId} />
          </Modal>
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
  scrollViewStyle: {
    paddingHorizontal: moderateScale(5),
  },
  displayStack: {
    flexDirection: "row",
  },
  lineStyle: {
    borderBottomWidth: moderateScale(1),
    borderStyle: "dashed",
    width: "100%",
    marginVertical: moderateScale(10),
  },
  buttonStyle: {
    alignSelf: "center",
    minHeight: moderateScale(10),
    backgroundColor: Themes.primary,
    color: Themes.white,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    fontSize: moderateScale(16),
    marginTop: moderateScale(55),
    borderRadius: moderateScale(5),
  },
});
export default OrderSummary;
