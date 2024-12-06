import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { signupRequest } from "@/api/auth";
import { login } from "@/redux/slices/authSlice";
import { save } from "@/redux/slices/userSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    try {
      setError("");
      const data = await signupRequest(email, password, name);
      dispatch(login(data.token));
      dispatch(
        save({
          email: data.email,
          id: data.id,
          username: data.username,
          name: data.name,
        }),
      );
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Sign Up</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
      <Button mode="contained" onPress={handleSignup}>
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/login")}
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
