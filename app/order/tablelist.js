import { View, StyleSheet, ScrollView, Modal } from "react-native";
import TableCard from "../../src/components/tableCard";
import moderateScale from "@/src/utils/responsiveScale";
import { useEffect, useState } from "react";
import { Themes } from "@/src/utils/themes";
import AntDesign from "@expo/vector-icons/AntDesign";
import OrderSummary from "@/app/order/orderSummary";
import { useHomeContext } from "@/src/context/useHomeContext";
import EmptyContent from "../EmptyContent";
import Loader from "../Loader";

const TableList = () => {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTable, setCurrentTable] = useState("");
  const [tableNames, setTableNames] = useState([]);
  const { tableCount } = useHomeContext();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const hideLoader = () => setLoaderVisible(false);
  const showLoader = () => setLoaderVisible(true);

  useEffect(() => {
    let tNames = [];
    for (let count = 1; count <= tableCount; count++) {
      tNames.push(`T${count}`);
    }
    setTableNames(tNames);
  }, [tableCount]);
  if (!tableCount)
    return <EmptyContent content="Configure Number Of Tables in Settings" />;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {tableNames.map((value, index) => {
          const onLongPress = () => {
            setCurrentTable(value);
            showModal();
          };
          return (
            <TableCard
              tableId={value}
              key={index}
              onLongPress={onLongPress}
              showLoader={showLoader}
              hideLoader={hideLoader}
            />
          );
        })}
      </ScrollView>
      {modalVisible && (
        <Modal style={styles.modalConatainer} onRequestClose={hideModal}>
          <View style={styles.modalHeader}>
            <AntDesign
              name="close"
              size={24}
              color={Themes.white}
              onPress={hideModal}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
          <OrderSummary tableId={currentTable} hideModal={hideModal} />
        </Modal>
      )}
      {loaderVisible && <Loader />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: moderateScale(20),
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: moderateScale(20),
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between",
  },
  modalConatainer: {
    backgroundColor: Themes.white,
  },
  modalHeader: {
    backgroundColor: Themes.primary,
    height: moderateScale(50),
    elevation: 6,
    justifyContent: "center",
    paddingHorizontal: moderateScale(10),
  },
});
export default TableList;
