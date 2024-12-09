import React from "react";
import { Text } from "react-native-paper";
import Background from "../components/ui/Background";
import BackButton from "../components/ui/BackButton";
import Logo from "../components/ui/Logo";
import Header from "../components/ui/Header";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { useSelector } from "react-redux";
import { Redirect, useRouter } from "expo-router";
import { RootState } from "@/redux/store";
import useResetPassword from "@/hooks/useResetPassword";
import { Controller } from "react-hook-form";
import { theme, themeStyles } from "@/core/theme";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { control, handleLogin, errors, handleSubmit } = useResetPassword();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    console.log("RootLayout: Redirecting user to Dashboard");
    return <Redirect href="/dashboard" />;
  }

  return (
    <Background>
      <BackButton goBack={router.back} />
      <Logo />
      <Header>Restore Password</Header>
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

      <Button
        style={Button}
        mode="contained"
        onPress={handleSubmit(handleLogin)}
      >
        Send Instructions
      </Button>
    </Background>
  );
}
