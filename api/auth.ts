import { JwtUserPayload } from "@/types/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/${process.env.EXPO_PUBLIC_PATH}`;

export const loginRequest = async (email: string, password: string) => {
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
};

export const signupRequest = async (
  email: string,
  password: string,
  name: string,
) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    name,
  });
  return response.data;
};
