import { TextInput } from "react-native";
import { View, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useEffect, useRef, useState } from "react";
import { useHomeContext } from "@/src/context/useHomeContext";
import moderateScale from "@/src/utils/responsiveScale";
import ItemCard from "@/src/components/itemCard";
import { ScrollView } from "react-native";
import Fuse from "fuse.js";
import useOrders from "@/src/hooks/useOrders";
import EmptyContent from "@/app/EmptyContent";
import { Themes } from "@/src/utils/themes";

const SearchMenuItems = ({ tableId, hideModal }) => {
  const [inputText, setInputText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { menu } = useHomeContext();
  const { addItemToCart } = useOrders();
  const products = menu?.map((data) => data.dishes).flat();
  const searchBarRef = useRef();

  function customDebounce(func, delay) {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const handleInputChange = (text) => {
    setInputText(text);
    debouncedUpdate(text); // Call the debounced function
  };

  const updateDebouncedText = (text) => {
    // You can perform your API call or other delayed logic here
    const options = {
      // includeScore: true,
      threshold: 0.5,
      keys: [
        "product_name",
        "category",
        "product_description",
        "product_price",
      ],
    };

    const fuse = new Fuse(products, options);

    // Search for a fuzzy match
    const result = fuse.search(text);

    // console.log(result.map((data) => data.item));
    setSearchResult(result.map((data) => data.item));
  };

  // Create a debounced version of the updateDebouncedText function
  const debouncedUpdate = customDebounce(updateDebouncedText, 10); // Adjust delay as needed

  useEffect(() => {
    setTimeout(() => {
      if (searchBarRef) {
        searchBarRef.current.focus();
        console.log("yes reference", searchBarRef.current.focus());
      } else {
        console.log("No reference");
      }
    }, 100);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          onChangeText={handleInputChange}
          value={inputText}
          style={{ flex: 1, height: "100%" }}
          placeholder="Search dishes"
          ref={searchBarRef}
          // autoFocus={true}
          caretHidden={false}
          cursorColor={Themes.primary}
        />
        <EvilIcons name="search" size={24} color="black" />
      </View>
      <ScrollView contentContainerStyle={styles.itemContainer}>
        {searchResult.length > 0 ? (
          searchResult.map((product, index) => {
            return (
              <ItemCard
                tableId={tableId}
                productId={product.product_id}
                productName={product.product_name}
                productDescription={product.product_description}
                key={index}
                onAdd={(quantity) => {
                  quantity &&
                    addItemToCart({
                      tableId,
                      amountPerUnit: Number(
                        product.product_price?.replace(",", ".")
                      ),
                      productName: product.product_name,
                      productId: product.product_id,
                      quantity,
                    });
                }}
              />
            );
          })
        ) : (
          <EmptyContent content={"No Result Found"} />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
});
export default SearchMenuItems;
