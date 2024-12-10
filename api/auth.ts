import { Platform } from "react-native";
import { JwtUserPayload, RegisterFormValues } from "@/types/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { log } from "@/common/logger";
import { handleToastError } from "@/utils/utils";

const API_URL = `${Platform.OS === "web" ? process.env.EXPO_PUBLIC_API_URL_WEB : process.env.EXPO_PUBLIC_API_URL_ANDROID}/${process.env.EXPO_PUBLIC_PATH}`;

type ApiResponseType = {
  status: number;
  error: string | undefined;
  data: any;
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<ApiResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.status < 205) {
      const { data } = response;
      const decoded: JwtUserPayload = jwtDecode(data.token);
      const user = {
        email: decoded.email,
        id: decoded.id,
        username: decoded.username,
        name: decoded.name,
      };
      return {
        status: response.status,
        error: undefined,
        data: { token: data.token, user },
      };
    } else {
      log.info(`Unexpected status code: ${response.status}`);
      return {
        status: response.status,
        error: response.data.message,
        data: {},
      };
    }
  } catch (error: any) {
    handleToastError(error);
    return {
      status: 500,
      error: "An unexpected error occurred. Please try again.",
      data: {},
    };
  }
};

export const signupRequest = async (
  data: RegisterFormValues,
): Promise<ApiResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);

    if (response.status < 205) {
      log.info("User registered successfully");
      return { status: response.status, error: undefined, data: response.data };
    } else {
      log.info(`Unexpected status code: ${response.status}`);
      return {
        status: response.status,
        error: response.data.message,
        data: {},
      };
    }
  } catch (error: any) {
    handleToastError(error);
    return {
      status: 500,
      error: "An unexpected error occurred. Please try again.",
      data: {},
    };
  }
};
