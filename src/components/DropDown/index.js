import React, { useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import downIcon from "./assests/down.png";
import { styles } from "./styles";
/**
 * DropDown component
 * selected value is received through function onChange
 * data is an array of objects, which will contain the label key and respective value key
 * label key and value key can be defined through labelField and valueField props respectively[default{label,value}]
 * data (required)
 * onChange (required)
 */
const Dropdown = ({
  placeHolder = "Select",
  data = [{ label: "", value: "" }],
  onChange = () => {},
  style,
  containerStyle,
  placeHolderStyle,
  activeColor,
  iconSize = 20,
  iconColor = "",
  labelField = "",
  valueField = "",
  icon,
}) => {
  const isIcon = React.isValidElement(icon);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [position, setPosition] = useState("");
  const ref = useRef();
  const iconStyle = useRef({ width: iconSize, height: iconSize }).current;
  const toggleVisibility = () => setShow(!show);
  const hideVisibility = () => setShow(false);
  const onOptonSelection = (value) => {
    setShow(false);
    setSelected(value);
  };
  const locatePosition = () => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setPosition({
          width: Math.floor(width),
          left: Math.floor(x),
          top: Math.floor(y) + height,
        });
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleVisibility}
        style={[styles.dropDown, style]}
        ref={ref}
        onLayout={locatePosition}
      >
        <View style={styles.labelContainerStyle}>
          <Text
            children={selected ? selected : placeHolder}
            style={[styles.textStyle, placeHolderStyle]}
          />
          {isIcon ? (
            icon
          ) : (
            <Image
              source={downIcon}
              style={[iconStyle, { tintColor: iconColor }]}
            />
          )}
        </View>
      </TouchableOpacity>
      <Modal transparent visible={show} onRequestClose={hideVisibility}>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
          }}
          activeOpacity={1}
          style={{ flex: 1 }}
        >
          <View style={[styles.optionView, containerStyle, position]}>
            <ScrollView style={{ flexGrow: 1 }}>
              {data.map((item) => {
                const label = labelField ? item[labelField] : item["label"];
                const value = valueField ? item[valueField] : item["value"];
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onOptonSelection(label);
                      onChange(value);
                    }}
                    style={[
                      styles.optionContainer,
                      selected == value && { backgroundColor: activeColor },
                    ]}
                    key={value}
                  >
                    <Text style={styles.textStyle}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
