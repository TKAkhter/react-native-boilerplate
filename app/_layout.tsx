import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { useColorScheme } from "@/hooks/useColorScheme";
import store, { persistor } from "@/redux/store";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from "react-native-root-siblings";
import { log } from "@/common/logger";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  try {
    log.info("RootLayout: Rendering application layout.");
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);

    if (!loaded) {
      return null;
    }

    log.info(`RootLayout: Current theme is ${colorScheme ? "dark" : "light"}`);

    return (
      <RootSiblingParent>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Stack>
                  <Stack.Screen
                    name="(home)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="register"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="reset-password"
                    options={{ headerShown: false }}
                  />
                </Stack>
                <StatusBar style="auto" />
              </ThemeProvider>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </RootSiblingParent>
    );
  } catch (err) {
    log.error("RootLayout: Error rendering layout:", err);
    throw err;
  }
}
