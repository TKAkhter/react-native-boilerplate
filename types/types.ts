import { JwtPayload } from "jwt-decode";

export interface JwtUserPayload extends JwtPayload {
  username: string;
  id: string;
  email: string;
  name: string;
}

export interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
