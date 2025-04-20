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
import { Buffer } from "buffer";
import { useHomeContext } from "@/src/context/useHomeContext";

const OrderSummary = ({ tableId, hideModal = () => {} }) => {
  const { orders } = useOrderContext();
  const { menu } = useHomeContext();
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
  const products = menu.map((data) => data.dishes).flat();
  // get orders of the selected table
  const orderOfTheTable = orders.get(tableId);
  // calculation of sub total of all itemes present
  const subTotal = orderOfTheTable?.reduce((subTotal, product) => {
    const productPrice = products.find(
      (value) => value.product_id == product.productId
    )?.product_price;
    const amount = product.quantity * Number(productPrice.replace(",", "."));
    console.log(
      productPrice,
      product.productId,
      product.productName,
      "\t",
      product.quantity,
      "\t",
      product.amountPerUnit,
      "\t",
      amount
    );
    return subTotal + amount;
  }, 0);
  // quantity count
  const quantityCount = orderOfTheTable?.reduce((quantityCount, product) => {
    return quantityCount + product.quantity;
  }, 0);
  // table customer data
  const customer = customersData?.get(tableId);
  // console.log(customer?.customerName, customer?.serverName, ">>>>>>>>>>");

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
      `Qty\tItem Description\t\t\t\t\n` +
      `----------------------------------------------\n`;
    for (const product of orderOfTheTable) {
      itemsList =
        itemsList + `${product.quantity}\t${product.productName}\t\t\t\t\n`;
    }
    totalInfo =
      `----------------------------------------------\n` +
      `Total\t\t\t\t\t\t\t\t\t\t\t\t${subTotal}\n` +
      `----------------------------------------------\n`;
    console.log(receiptInfo + itemsList);

    return receiptInfo + itemsList;
  };
  const generatePrintBytes = () => {
    const billData = {
      companyName: "Syrtaki",
      address: "123 Main St, Anytown",
      phone: "555-1234",
      customer: customer?.customerName ?? "Guest",
      server: customer?.serverName ?? "Server !",
      items: orderOfTheTable,
      total: `${subTotal.toFixed(2).replace(".", ",")}`,
      tableId,
      dateTime: new Date().toLocaleString(),
    };
    // console.log(`${subTotal.toFixed(2).replace(".", ",")}`, "<<<<<<<<<<<<<<");

    // variable to store escpos code
    let escposString = "";

    // Initialize printer
    escposString += "\x1B\x40";

    // Company Info (Centered)
    escposString += "\x1B\x61\x01" + billData.companyName + "\n";
    // escposString += billData.address + "\n";
    // escposString += "Tel: " + billData.phone + "\n";
    escposString += "Table: " + billData.tableId + "\n";
    escposString += "Customer: " + billData.customer + "\n";
    escposString += "Server: " + billData.server + "\n";
    escposString += "\x1B\x61\x00"; // Left alignment
    escposString += "--------------------------------\n";

    // Items
    billData.items.forEach((item) => {
      const productPrice = products.find(
        (value) => value.product_id == item.productId
      )?.product_price;
      const formattedPrice = parseFloat(
        item.quantity * Number(productPrice.replace(",", "."))
      )
        .toFixed(2)
        .replace(".", ",");
      const line =
        item.quantity +
        "\t" +
        item.productName +
        " ".repeat(
          Math.max(0, 32 - item.productName.length - formattedPrice.length)
        ) +
        formattedPrice +
        "\n";
      escposString += line;
    });

    // Total
    escposString += "--------------------------------\n";
    escposString +=
      "TOTAL (EURO) " +
      " ".repeat(Math.max(0, 24 - billData.total.length)) +
      billData.total +
      "\n";
    escposString += "--------------------------------\n";

    // Date and Time (Right Aligned)
    escposString += "\x1B\x61\x02" + billData.dateTime + "\n";
    escposString += "\x1B\x61\x00"; // Left alignment
    escposString += "\n\n\n";

    // Cut paper
    escposString += "\x1D\x56\x41\x10";

    // Convert the ESC/POS string to a Buffer (which can be treated as a byte array)
    const buffer = Buffer.from(escposString, "latin1"); // 'latin1' encoding for ESC/POS

    // Convert the Buffer to a regular number array (for easier passing to Native Module)
    const byteArray = Array.from(buffer);

    return byteArray;
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
            <Text style={{ flex: 2 }}>Item Description</Text>
            <Text style={{ flex: 0.5 }}>Qty</Text>
            <Text style={{ flex: 0.5 }}>Price</Text>
          </View>
          <View style={styles.lineStyle}></View>

          {orderOfTheTable.map((product, index) => {
            const productPrice = products.find(
              (value) => value.product_id == product.productId
            )?.product_price;
            return (
              <View style={styles.displayStack} key={index}>
                <Text style={{ flex: 2 }}>{product.productName}</Text>
                <Text style={{ flex: 0.5 }}>{product.quantity}</Text>
                <Text style={{ flex: 0.5 }}>
                  {parseFloat(
                    product.quantity * Number(productPrice.replace(",", "."))
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>
              </View>
            );
          })}

          <View style={styles.lineStyle}></View>
          <View style={styles.displayStack}>
            <Text style={{ flex: 2 }}>Total €</Text>
            <Text style={{ flex: 0.4 }}>
              {subTotal.toFixed(2).replace(".", ",")}
            </Text>
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
              onPress={
                isPrinting
                  ? null
                  : async () => {
                      const receipt = generatePrintBytes();
                      const result = await printInWifiMode(receipt);
                      result && deleteOrder(tableId);
                    }
              }
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
