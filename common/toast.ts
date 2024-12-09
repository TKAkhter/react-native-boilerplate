import { theme } from "@/core/theme";
import { Platform, ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

const defaultOptions = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.TOP,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  opacity: 0.5,
  onHidden: () => console.log("Toast hidden"),
};

export const toast = {
  success: (message: string) =>
    Platform.OS === "android"
      ? ToastAndroid.show(message, ToastAndroid.SHORT)
      : Toast.show(message, {
          ...defaultOptions,
          backgroundColor: theme.colors.primary, // Success Green
          textColor: "#fff",
        }),
  error: (message: string) =>
    Platform.OS === "android"
      ? ToastAndroid.show(message, ToastAndroid.SHORT)
      : Toast.show(message, {
          ...defaultOptions,
          backgroundColor: theme.colors.error, // Error Red
          textColor: "#fff",
        }),
};
