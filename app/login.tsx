import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import Background from "../components/ui/Background";
import { Redirect, useRouter } from "expo-router";
import Logo from "../components/ui/Logo";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import BackButton from "../components/ui/BackButton";
import useLogin from "@/hooks/useLogin";
import { theme, themeStyles } from "../core/theme";
import { RootState } from "@/redux/store";
import { Controller } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const { control, handleLogin, errors, handleSubmit } = useLogin();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    console.log("RootLayout: Redirecting user to Dashboard");
    return <Redirect href="/dashboard" />;
  }

  return (
    <Background>
      <BackButton goBack={router.back} />
      <Logo />
      <Header>Welcome back.</Header>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            style={themeStyles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={themeStyles.error}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
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
            onChangeText={onChange}
            style={themeStyles.input}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={themeStyles.error}>{errors.password.message}</Text>
      )}

      <View style={themeStyles.forgotPassword}>
        <TouchableOpacity onPress={() => router.push("/reset-password")}>
          <Text style={themeStyles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        style={Button}
        mode="contained"
        onPress={handleSubmit(handleLogin)}
      >
        Login
      </Button>
      <View style={themeStyles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={themeStyles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
