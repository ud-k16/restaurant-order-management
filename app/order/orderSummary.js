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
import { useBluetoothContext } from "@/src/context/useBluetoothContext";

const OrderSummary = ({ tableId, hideModal = () => {} }) => {
  const { orders } = useOrderContext();
  const { menu, bluetooth } = useHomeContext();
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

  const generatePrintBytes = () => {
    const billData = {
      companyName: "Order Management App",
      address: "123 Main St, Anytown",
      phone: "555-1234",
      customer: customer?.customerName ?? "Guest",
      server: customer?.serverName ?? "Server !",
      items: orderOfTheTable,
      total: `${subTotal.toFixed(2).replace(".", ",")}`,
      tableId,
      dateTime: new Date().toLocaleString(),
    };

    let escposString = "";

    // Initialize printer
    escposString += "\x1B\x40";

    // Company Info (Centered, Larger Font for Name)
    escposString += "\x1B\x61\x01"; // Center alignment
    escposString += "\x1B\x21\x18"; // Double height and width font
    escposString += billData.companyName + "\n";
    escposString += "\x1B\x21\x00"; // Reset font size
    // escposString += billData.address + "\n";
    // escposString += "Tel: " + billData.phone + "\n";
    escposString += "Table: " + billData.tableId + "\n";
    escposString += "Customer: " + billData.customer + "\n";
    escposString += "Server: " + billData.server + "\n";
    escposString += "\x1B\x61\x00"; // Left alignment
    escposString +=
      "------------------------------------------------------------------------------\n"; // 82 hyphens

    // Items (Adjusted for 80mm paper)
    billData.items.forEach((item) => {
      const productPrice = products.find(
        (value) => value.product_id == item.productId
      )?.product_price;
      const formattedPrice = parseFloat(
        item.quantity * Number(productPrice?.replace(",", ".") || "0") // Handle potential undefined
      )
        .toFixed(2)
        .replace(".", ",");

      // Adjust product name length and spacing
      const quantityStr = item.quantity.toString().padEnd(4); // Quantity with spacing
      const priceStr = formattedPrice.padStart(10); // Price aligned to the right

      let productName = item.productName;
      const maxProductNameLength = 80 - 4 - 10 - 6; // 80 (total) - qty - space - price - space

      if (productName.length > maxProductNameLength) {
        escposString +=
          quantityStr +
          " " +
          productName.substring(0, maxProductNameLength) +
          " ... " +
          priceStr +
          "\n";
        // If needed, break down the product name into multiple lines
        let remainingName = productName.substring(maxProductNameLength);
        while (remainingName.length > maxProductNameLength) {
          escposString +=
            "     " +
            remainingName.substring(0, maxProductNameLength) +
            " ... " +
            "".padStart(10) +
            "\n";
          remainingName = remainingName.substring(maxProductNameLength);
        }
        if (remainingName.length > 0) {
          escposString +=
            "     " +
            remainingName.padEnd(maxProductNameLength + 5) +
            priceStr +
            "\n";
        }
      } else {
        const padding = " ".repeat(
          Math.max(0, maxProductNameLength - productName.length)
        );
        escposString +=
          quantityStr + " " + productName + padding + " " + priceStr + "\n";
      }
    });

    // Total
    escposString +=
      "------------------------------------------------------------------------------\n";
    escposString += "\x1B\x45\x01"; // Bold on
    escposString +=
      "TOTAL (EURO)".padEnd(60) + billData.total.padStart(22) + "\n";
    escposString += "\x1B\x45\x00"; // Bold off
    escposString +=
      "------------------------------------------------------------------------------\n";

    // Date and Time (Right Aligned)
    escposString += "\x1B\x61\x02" + billData.dateTime + "\n";
    escposString += "\x1B\x61\x00"; // Left alignment
    escposString += "\n\n\n";

    // Cut paper (Adjusted for full cut)
    escposString += "\x1D\x56\x41\x40"; // Full cut

    // Convert the ESC/POS string to a Buffer
    const buffer = Buffer.from(escposString, "latin1");

    // Convert the Buffer to a regular number array
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
            <Text style={{ flex: 0.5, textAlign: "right" }}>Price</Text>
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
                <Text style={{ flex: 0.5, textAlign: "right" }}>
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
            <Text style={{ flex: 0.4, textAlign: "right" }}>
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
          {bluetooth ? (
            <Text
              style={styles.menuTextStyle}
              onPress={
                isPrinting
                  ? null
                  : async () => {
                      const receipt = generatePrintBytes();
                      router.navigate({
                        pathname:
                          "/printerConnectivity/connectToBluetoothPrinter",
                        params: { tableId, receipt: JSON.stringify(receipt) },
                      });
                      hideModal();
                    }
              }
            >
              Print Receipt
            </Text>
          ) : !!ip && !!port ? (
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
