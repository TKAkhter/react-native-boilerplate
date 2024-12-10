import { DefaultTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#000000",
    primary: "#560CCE",
    secondary: "#414757",
    error: "#f13a59",
    white: "#ffffff",
  },
};

export const themeStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
  },
  button: {
    marginTop: 10,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
