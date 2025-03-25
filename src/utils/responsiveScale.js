import { Dimensions, PixelRatio, Platform } from "react-native";

// Get screen width and height
const { width } = Dimensions.get("window");

// Reference device width (360dp for a typical Android device)
// 375 is the base width of iPhone 6, adjust as needed reference device, e.g., 375x667 for iPhone 6
const referenceWidth = Platform.OS == "android" ? 360 : 375;

// Custom moderateScale function
function moderateScale(size, factor = 0.5) {
  const scaleFactor = width / referenceWidth; // Calculate the scaling factor based on screen width
  const newSize = size * scaleFactor; // Scale the size based on the width
  return Math.round(
    PixelRatio.roundToNearestPixel(newSize + (size - newSize) * factor)
  );
}

export default moderateScale;
