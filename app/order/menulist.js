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
import { useCallback, useEffect, useRef, useState } from "react";
import useOrders from "@/src/hooks/useOrders";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { Link, useFocusEffect } from "expo-router";
import { useHeaderContext } from "@/src/context/useHeaderContext";
import { useHomeContext } from "@/src/context/useHomeContext";
const MenuList = () => {
  const { tableId } = useGlobalSearchParams();
  // showing list of menu Category logic variables
  // ---------------------------------------------
  const [categoryVisible, setCategoryVisible] = useState(false);
  const flatlistRef = useRef();
  const toggleCategoryVisibility = () => setCategoryVisible((prev) => !prev);
  // ================================================
  const { addItemToCart, deleteCart, activeTableId } = useOrders();
  // for setting Table name in Header
  // --------------------------------
  const { setState: setHeaders } = useHeaderContext();
  const { menu } = useHomeContext();
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
  }, []);
  // ==================================================

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={
          <EmptyContent content={"No Menu- upload Menu file in Settings"} />
        }
        ref={flatlistRef}
        data={menu}
        renderItem={({ item }) => {
          const { name, items } = item;
          return (
            <View>
              <ScrollView>
                <Text style={styles.categoryHeading}>{name}</Text>
                <View style={styles.itemContainer}>
                  {items.map((value, index) => {
                    return (
                      <ItemCard
                        tableId={tableId}
                        productId={value.product_id}
                        productName={value.product_name}
                        key={index}
                        onAdd={(quantity) => {
                          quantity &&
                            addItemToCart({
                              tableId,
                              amountPerUnit: value.price,
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
        }}
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
            style={{ padding: moderateScale(10) }}
            data={menu}
            ItemSeparatorComponent={<View style={styles.dividerLine}></View>}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  toggleCategoryVisibility();
                  if (flatlistRef?.current)
                    flatlistRef.current.scrollToItem({
                      item,
                      animated: true,
                    });
                  else console.log("unable to scroll to index");
                }}
              >
                <Text style={styles.categoryTextStyle}>{item.name}</Text>
              </Pressable>
            )}
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
    height: "80%",
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
});
export default MenuList;
