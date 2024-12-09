import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { themeStyles } from "@/core/theme";

export default function NotFoundScreen() {
  try {
    console.log("Rendering NotFoundScreen component");

    return (
      <>
        <Stack.Screen options={{ title: "Oops!" }} />
        <ThemedView style={themeStyles.container}>
          <ThemedText type="title">This screen doesn't exist.</ThemedText>
          <Link href="/" style={themeStyles.link}>
            <ThemedText type="link">Go to home screen!</ThemedText>
          </Link>
        </ThemedView>
      </>
    );
  } catch (error: any) {
    console.error("Error in NotFoundScreen component:", error);
    return (
      <ThemedView style={themeStyles.container}>
        <ThemedText type="title">An unexpected error occurred.</ThemedText>
        <ThemedText type="title">
          {error.message || "Please try again later."}
        </ThemedText>
      </ThemedView>
    );
  }
}
