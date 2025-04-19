import { TextInput } from "react-native";
import { View, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import { useHomeContext } from "@/src/context/useHomeContext";
const SearchMenuItems = () => {
  const [inputText, setInputText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const { menu } = useHomeContext();
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
    console.log("Updating debounced text:", text);
    setDebouncedText(text);
    // You can perform your API call or other delayed logic here
  };

  // Create a debounced version of the updateDebouncedText function
  const debouncedUpdate = customDebounce(updateDebouncedText, 500); // Adjust delay as needed

  return (
    <View style={styles.container}>
      <View>
        <TextInput onChangeText={handleInputChange} />
        <EvilIcons name="search" size={24} color="black" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {},
});
export default SearchMenuItems;
