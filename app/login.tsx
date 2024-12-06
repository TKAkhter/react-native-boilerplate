import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { loginRequest } from "@/api/auth";
import { login } from "@/redux/slices/authSlice";
import { save } from "@/redux/slices/userSlice";
import { axiosClient } from "@/common/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError("");
      const data = await loginRequest(email, password);
      dispatch(login(data.token));
      // dispatch(save(data.user)); // Assumes the API returns user data under `user`
      axiosClient.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/register")}
        style={styles.button}
      >
        Don't have an account? Sign Up
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
