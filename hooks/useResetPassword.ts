import { axiosClient } from "../common/axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { save } from "../redux/slices/userSlice";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { loginRequest } from "@/api/auth";
import { ResetPasswordValues } from "@/types/types";
import { log } from "@/common/logger";
import { handleToastError } from "@/utils/utils";
import { toast } from "@/common/toast";

const useResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (loginData: ResetPasswordValues) => {
    log.info("LoginScreen: Attempting to login with email:", loginData.email);
    try {
      const { email } = loginData;

      // Attempting to login
      const { error, data } = await loginRequest(email, "");
      log.info("LoginScreen: Login successful:", data);
      if (!error) {
        dispatch(login(data.token!));
        dispatch(save(data.user!));
        axiosClient.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        router.push("/");
      }
    } catch (err: any) {
      log.error("LoginScreen: Login error:", err.response.data.message);
      handleToastError(err);
    }
  };

  return { control, handleLogin, errors, handleSubmit };
};

export default useResetPassword;
