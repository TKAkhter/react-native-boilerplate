import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Token expiration time in seconds since the epoch
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp > currentTime;
  } catch (error) {
    console.error(error);
    return false;
  }
};
