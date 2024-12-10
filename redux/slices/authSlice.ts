import { log } from "@/common/logger";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      log.info("Dispatching login action with payload:", action.payload);
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      log.info("Dispatching login action with state:", state);
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
