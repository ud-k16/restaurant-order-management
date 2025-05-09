import moderateScale from "@/src/utils/responsiveScale";
import ItemCard from "@/src/components/itemCard";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Themes } from "@/src/utils/themes";
import EmptyContent from "@/app/EmptyContent";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useOrders from "@/src/hooks/useOrders";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Link, useFocusEffect } from "expo-router";
import { useHeaderContext } from "@/src/context/useHeaderContext";
import { useHomeContext } from "@/src/context/useHomeContext";
import SearchMenuItems from "../SearchBar";
import { Modal } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
const MenuList = () => {
  const { tableId } = useGlobalSearchParams();
  // searchbar visible logic
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  // ==============================
  // showing list of menu Category logic variables
  // ---------------------------------------------
  const [categoryVisible, setCategoryVisible] = useState(false);
  const flatlistRef = useRef();
  const toggleCategoryVisibility = () => setCategoryVisible((prev) => !prev);
  // ================================================
  const { addItemToCart, deleteCart, activeTableId } = useOrders();
  const { menu } = useHomeContext();

  // for setting Table name in Header
  // --------------------------------
  const { setState: setHeaders } = useHeaderContext();
  // Header Title set happening on  screen focus
  useFocusEffect(
    useCallback(() => {
      setHeaders({
        currentPage: "Menu",
        currentTable: tableId,
      });
      return () => {
        setHeaders({ currentPage: "", currentTable: "" });
      };
    }, [])
  );
  // =================================================
  // updating table Id in the context
  // --------------------------------
  useEffect(() => {
    activeTableId(tableId);

    return () => {
      console.log("umnounting menu list");
    };
  }, []);
  // ==================================================

  // render Menu [category and respective dishes]
  const renderMenu = ({ item, index }) => {
    const { category, dishes } = item;
    return (
      <View>
        <ScrollView>
          <Text style={styles.categoryHeading}>{category}</Text>
          <View style={styles.itemContainer}>
            {dishes.map((value, index) => {
              return (
                <ItemCard
                  tableId={tableId}
                  productId={value.product_id}
                  productName={value.product_name}
                  productDescription={value.product_description}
                  key={index}
                  onAdd={(quantity) => {
                    // console.log(value.product_price, ">>>>>>>>>>>>>>>");
                    quantity &&
                      addItemToCart({
                        tableId,
                        amountPerUnit: Number(
                          value.product_price?.replace(",", ".")
                        ),
                        productName: value.product_name,
                        productId: value.product_id,
                        quantity,
                      });
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  };

  // render Menu Category alone with link to it in the menu list display
  const renderCategoryLink = ({ item, index }) => (
    <Pressable
      onPress={() => {
        console.log(index);

        toggleCategoryVisibility();
        if (flatlistRef?.current)
          flatlistRef.current.scrollToIndex({
            index,
            animated: true,
          });
        else console.log("unable to scroll to index");
      }}
    >
      <Text style={styles.categoryTextStyle}>{item.category}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={showModal} style={styles.searchBarContainer}>
        <TextInput
          editable={false}
          style={{ flex: 1 }}
          placeholder="Search dishes"
        />
        <EvilIcons name="search" size={30} color={Themes.primary} />
      </Pressable>
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
          <SearchMenuItems tableId={tableId} hideModal={hideModal} />
        </Modal>
      )}
      <FlatList
        ListEmptyComponent={
          <EmptyContent content={"No Menu- upload Menu file in Settings"} />
        }
        initialNumToRender={menu ? menu.length : 0}
        ref={flatlistRef}
        onScrollToIndexFailed={() => {
          console.log("unable to scroll");
        }}
        data={menu}
        renderItem={renderMenu}
      />
      {menu && (
        <View style={styles.bottomBar}>
          <Text
            style={{ color: Themes.white, fontSize: moderateScale(16) }}
            onPress={() => {
              deleteCart();
            }}
          >
            Clear Menu
          </Text>

          <Link
            style={{ color: Themes.white, fontSize: moderateScale(16) }}
            href={{
              pathname: "/order/cartSummary",
              params: {
                tableId,
              },
            }}
          >
            View Orders
          </Link>
        </View>
      )}
      {categoryVisible && (
        <View style={styles.categoryContainer}>
          <FlatList
            style={{
              paddingHorizontal: moderateScale(10),
            }}
            data={menu}
            ItemSeparatorComponent={<View style={styles.dividerLine}></View>}
            renderItem={renderCategoryLink}
          />
        </View>
      )}
      {menu && (
        <Pressable
          style={styles.bottomArrowContainer}
          onPress={toggleCategoryVisibility}
        >
          {!categoryVisible ? (
            <AntDesign name="arrowup" size={35} color="black" />
          ) : (
            <AntDesign name="arrowdown" size={35} color="black" />
          )}
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "80%",
    height: "90%",
    backgroundColor: Themes.black,
    paddingBottom: moderateScale(60),
  },
  categoryTextStyle: {
    color: Themes.white,
    fontSize: moderateScale(20),
  },
  categoryHeading: {
    marginVertical: moderateScale(15),
    fontSize: moderateScale(20),
    fontWeight: 500,
    paddingHorizontal: moderateScale(18),
    textAlign: "center",
    color: Themes.primary,
  },
  searchBarContainer: {
    paddingHorizontal: moderateScale(20),
    height: moderateScale(40),
    borderWidth: moderateScale(1),
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(5),
  },

  dividerLine: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Themes.white,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    width: "100%",
  },
  bottomBar: {
    backgroundColor: Themes.primary,
    paddingVertical: moderateScale(5),
    height: moderateScale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    zIndex: 1000,
  },
  bottomArrowContainer: {
    zIndex: 1000,
    alignSelf: "center",
    borderRadius: moderateScale(30),
    borderColor: Themes.black,
    borderWidth: moderateScale(2),
    backgroundColor: Themes.white,
    position: "absolute",
    bottom: 0,
    height: moderateScale(60),
    width: moderateScale(60),
    alignItems: "center",
    justifyContent: "center",
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
export default MenuList;
