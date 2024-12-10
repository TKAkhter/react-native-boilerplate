import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput as TextInputIcon } from "react-native-paper";
import Background from "../components/ui/Background";
import Logo from "../components/ui/Logo";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import TextInput from "../components/ui/TextInput";
import BackButton from "../components/ui/BackButton";
import { themeStyles } from "../core/theme";
import { Redirect, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useRegister from "@/hooks/useRegister";
import { Controller } from "react-hook-form";
import { log } from "@/common/logger";

export default function RegisterScreen() {
  log.info("Rendering Register component");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { control, handleSignup, errors, getValues, handleSubmit } =
    useRegister();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    log.info("RootLayout: Redirecting user to Dashboard");
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
            onChangeText={(text: any) => onChange(text)}
            style={themeStyles.input}
            error={!!errors.name}
            mode="outlined"
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
            onChangeText={(text: any) => onChange(text)}
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
            onChangeText={(text: any) => onChange(text)}
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
          validate: (value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters long";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
              return "Password must contain at least one special character";
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={(text: any) => onChange(text)}
            style={themeStyles.input}
            error={!!errors.password}
            secureTextEntry={!passwordVisible}
            right={
              <TextInputIcon.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
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
            onChangeText={(text: any) => onChange(text)}
            style={themeStyles.input}
            error={!!errors.confirmPassword}
            secureTextEntry={!passwordVisible}
            right={
              <TextInputIcon.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
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
