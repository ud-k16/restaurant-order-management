import { useOrderContext } from "@/src/context/useOrderContext";
import { useCustomerContext } from "@/src/context/useCustomerContext";
import useCustomers from "@/src/hooks/useCustomers";
import moderateScale from "@/src/utils/responsiveScale";
import UserCard from "@/src/components/userCard";
import { View, StyleSheet, ScrollView, Text, Modal } from "react-native";
import EmptyContent from "@/app/EmptyContent";
import { Themes } from "@/src/utils/themes";
import { useWifiContext } from "@/src/context/useWifiContext";
import useOrders from "@/src/hooks/useOrders";
import { router } from "expo-router";

const OrderSummary = ({ tableId, hideModal = () => {} }) => {
  const { orders } = useOrderContext();
  const { customersData } = useCustomerContext();
  const { deleteOrder } = useOrders();
  const { isPrinting, printInWifiMode, ip, port } = useWifiContext();
  const {
    customerModelVisible,
    validationError,
    setState,
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
  console.log(customer?.customerName, customer?.serverName, ">>>>>>>>>>");

  // receipt
  const generateReceipt = () => {
    let receiptInfo = "",
      itemsList = "",
      totalInfo = "";
    receiptInfo =
      "RECEIPT\n" +
      `Date: ${new Date().toDateString()}\n` +
      `Customer: ${customer?.customerName}\n` +
      `Server: ${customer?.serverName}\n` +
      `Time: ${new Date().toLocaleTimeString()}\n` +
      `Table: ${tableId}\n` +
      `----------------------------------------------\n` +
      `Qty\tItem Description\t\t\t\tPrice\t\tAmount\n` +
      `----------------------------------------------\n`;
    for (const product of orderOfTheTable) {
      itemsList =
        itemsList +
        `${product.quantity}\t${product.productName}\t\t\t\t${
          product.amountPerUnit
        }\t\t${product.amountPerUnit * product.quantity}\n`;
    }
    totalInfo =
      `----------------------------------------------\n` +
      `Total\t\t\t\t\t\t\t\t\t\t\t\t${subTotal}\n` +
      `----------------------------------------------\n`;
    console.log(receiptInfo + itemsList + totalInfo);

    return receiptInfo + itemsList + totalInfo;
  };

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
            <Text style={{ flex: 1 }}>Total </Text>
            <Text style={{ flex: 0.29 }}>{subTotal}</Text>
          </View>
          <View style={styles.lineStyle}></View>
          {(!customer?.customerName || !customer?.serverName) && (
            <Text style={styles.buttonStyle} onPress={showCustomerModal}>
              Customer/Server Information
            </Text>
          )}

          <Modal
            visible={customerModelVisible}
            onRequestClose={hideCustomerModal}
            onDismiss={hideCustomerModal}
          >
            <UserCard
              hideModal={hideCustomerModal}
              addCustomerDataInTable={() => {
                const status = addCustomerDataInTable({ tableId });
                status && hideCustomerModal();
              }}
              validationError={validationError}
              customerName={customer?.customerName}
              serverName={customer?.serverName}
              setState={setState}
            />
          </Modal>
        </ScrollView>
      ) : (
        <EmptyContent />
      )}
      {orderOfTheTable && (
        <View style={styles.bottomAction}>
          <Text
            onPress={() => {
              deleteOrder(tableId);
            }}
            style={styles.menuTextStyle}
          >
            Delete Order
          </Text>
          {!!ip && !!port ? (
            <Text
              style={styles.menuTextStyle}
              onPress={async () => {
                const receipt = generateReceipt();
                const result = await printInWifiMode(receipt);
                result && deleteOrder(tableId);
              }}
            >
              {isPrinting ? "Printing........." : "Print Receipt"}
            </Text>
          ) : (
            <Text
              style={styles.menuTextStyle}
              onPress={() => {
                hideModal();
                router.navigate("/Configure");
              }}
            >
              Printer Config
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomAction: {
    height: moderateScale(50),
    backgroundColor: Themes.primary,

    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,

    position: "absolute",
    width: "100%",
  },
  menuTextStyle: {
    color: Themes.white,
    fontSize: moderateScale(16),
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
