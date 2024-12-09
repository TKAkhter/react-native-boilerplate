import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/ui/Background";
import Logo from "../components/ui/Logo";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import BackButton from "../components/ui/BackButton";
import { theme, themeStyles } from "../core/theme";
import { Redirect, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRegister from "@/hooks/useRegister";
import { Controller } from "react-hook-form";

export default function RegisterScreen() {
  console.log("Rendering Register component");
  const { control, handleSignup, errors, getValues, handleSubmit } =
    useRegister();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    console.log("RootLayout: Redirecting user to Dashboard");
    return <Redirect href="/dashboard" />;
  }

  return (
    <Background>
      <BackButton goBack={router.back} />
      <Logo />
      <Header>Create Account</Header>
      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onChangeText={(text: any) => {
              console.log("Name input changed:", text);
              onChange(text);
            }}
            style={themeStyles.input}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && (
        <Text style={themeStyles.error}>{errors.name.message}</Text>
      )}

      {/* Username Input */}
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Username"
            value={value}
            onChangeText={(text: any) => {
              console.log("Username input changed:", text);
              onChange(text);
            }}
            style={themeStyles.input}
            error={!!errors.username}
          />
        )}
      />
      {errors.username && (
        <Text style={themeStyles.error}>{errors.username.message}</Text>
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
            onChangeText={(text: any) => {
              console.log("Email input changed:", text);
              onChange(text);
            }}
            style={themeStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!errors.email}
          />
        )}
      />
      {errors.email && (
        <Text style={themeStyles.error}>{errors.email.message}</Text>
      )}

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
            onChangeText={(text: any) => {
              console.log("Password input changed");
              onChange(text);
            }}
            style={themeStyles.input}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={themeStyles.error}>{errors.password.message}</Text>
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
            onChangeText={(text: any) => {
              console.log("Confirm Password input changed");
              onChange(text);
            }}
            style={themeStyles.input}
            secureTextEntry
            error={!!errors.confirmPassword}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={themeStyles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Submit Button */}
      <Button
        style={Button}
        mode="contained"
        onPress={handleSubmit(handleSignup)}
      >
        Sign Up
      </Button>
      <View style={themeStyles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={themeStyles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
