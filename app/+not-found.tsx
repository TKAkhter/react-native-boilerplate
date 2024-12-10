import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { themeStyles } from "@/core/theme";
import { log } from "@/common/logger";

export default function NotFoundScreen() {
  try {
    log.info("Rendering NotFoundScreen component");

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
    log.error("Error in NotFoundScreen component:", error);
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
