import { Platform } from "react-native";
import { JwtUserPayload, RegisterFormValues } from "@/types/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = `${Platform.OS === "web" ? process.env.EXPO_PUBLIC_API_URL_WEB : process.env.EXPO_PUBLIC_API_URL_ANDROID}/${process.env.EXPO_PUBLIC_PATH}`;

export const loginRequest = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const decoded: JwtUserPayload = jwtDecode(data.token);
    const user = {
      email: decoded.email,
      id: decoded.id,
      username: decoded.username,
      name: decoded.name,
    };
    return { token: data.token, user };
  } catch (error: any) {
    console.log(error.response.data.message || error.message);
  }
};

export const signupRequest = async (data: RegisterFormValues) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
