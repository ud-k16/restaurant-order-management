import React, { useState, useCallback, useEffect } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";

const CustomSwitch = ({
  value,
  onValueChange,
  disabled = false,
  activeColor = "#0b64d0",
  inactiveColor = "#e0e0e0",
  circleColor = "white",
  animationDuration = 200,
  style,
  testID,
  accessibilityLabel,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleToggle = useCallback(() => {
    if (disabled) {
      return;
    }

    const newValue = !internalValue;
    setInternalValue(newValue);
    onValueChange(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true, // Important: Disable native driver
    }).start();
  }, [
    disabled,
    internalValue,
    onValueChange,
    animationDuration,
    animatedValue,
  ]);

  const containerBgColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const circleLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 21],
  });

  const accessibilityLabelText =
    accessibilityLabel || (value ? "Switch is on" : "Switch is off");

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: containerBgColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={handleToggle}
      activeOpacity={0.8}
      disabled={disabled}
      testID={testID}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabelText}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            left: circleLeft, // Use the interpolated value here
            backgroundColor: circleColor,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    top: 2,
    left: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
});

export default CustomSwitch;
