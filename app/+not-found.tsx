import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotFoundScreen() {
  try {
    console.log("Rendering NotFoundScreen component");

    return (
      <>
        <Stack.Screen options={{ title: "Oops!" }} />
        <ThemedView style={styles.container}>
          <ThemedText type="title">This screen doesn't exist.</ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText type="link">Go to home screen!</ThemedText>
          </Link>
        </ThemedView>
      </>
    );
  } catch (error: any) {
    console.error("Error in NotFoundScreen component:", error);
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">An unexpected error occurred.</ThemedText>
        <ThemedText type="title">
          {error.message || "Please try again later."}
        </ThemedText>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
