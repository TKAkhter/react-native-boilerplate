import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Redirect, useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Signup() {
  console.log("Rendering Signup component");
  const { control, handleSignup, errors, getValues, handleSubmit } =
    useRegister();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    console.log("RootLayout: Redirecting user to Dashboard");
    return <Redirect href="/dashboard" />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Sign Up</Text>

      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onChangeText={(text) => {
              console.log("Name input changed:", text);
              onChange(text);
            }}
            style={styles.input}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Username Input */}
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Username"
            value={value}
            onChangeText={(text) => {
              console.log("Username input changed:", text);
              onChange(text);
            }}
            style={styles.input}
            error={!!errors.username}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      {/* Email Input */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Enter a valid email address",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={(text) => {
              console.log("Email input changed:", text);
              onChange(text);
            }}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={(text) => {
              console.log("Password input changed");
              onChange(text);
            }}
            style={styles.input}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Confirm Password Input */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match", // Use getValues here
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Confirm Password"
            value={value}
            onChangeText={(text) => {
              console.log("Confirm Password input changed");
              onChange(text);
            }}
            style={styles.input}
            secureTextEntry
            error={!!errors.confirmPassword}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit(handleSignup)}>
        Sign Up
      </Button>

      {/* Navigate to Login */}
      <Button
        mode="text"
        onPress={() => {
          console.log("Navigating to login page");
          router.push("/login");
        }}
        style={styles.button}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
