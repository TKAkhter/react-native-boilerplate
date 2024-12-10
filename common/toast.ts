import { theme } from "@/core/theme";
import { Platform, TextStyle, ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";
import { log } from "./logger";

const defaultOptions: any = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.TOP,
  animation: true,
  hideOnPress: true,
  delay: 0,
  textStyle: {
    textAlign: "left",
  },
};

export const toast = {
  success: (message: string) =>
    Platform.OS === "android"
      ? ToastAndroid.show(message, ToastAndroid.SHORT)
      : Toast.show(message, {
          ...defaultOptions,
          backgroundColor: theme.colors.primary, // Success Green
          textColor: theme.colors.white,
        }),
  error: (message: string) =>
    Platform.OS === "android"
      ? ToastAndroid.show(message, ToastAndroid.SHORT)
      : Toast.show(message, {
          ...defaultOptions,
          backgroundColor: theme.colors.error, // Error Red
          textColor: theme.colors.white,
        }),
};
