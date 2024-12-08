import { axiosClient } from "../common/axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { save } from "../redux/slices/userSlice";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { loginRequest } from "@/api/auth";
import { LoginFormValues } from "@/types/types";
import { toast } from "@/common/toast";

const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    console.log("LoginScreen: Attempting to login with email:", data.email);
    try {
      const { email, password } = data;

      // Attempting to login
      const response = await loginRequest(email, password);
      console.log("LoginScreen: Login successful:", response);
      toast.success("JSON.stringify(response)");
      if (response) {
        dispatch(login(response.token));
        dispatch(save(response.user));
        axiosClient.defaults.headers["Authorization"] =
          `Bearer ${response.token}`;
        router.push("/");
      } else {
        console.log("Something went wrong!");
        toast.error("JSON.stringify(response)");
      }
    } catch (err: any) {
      console.error("LoginScreen: Login error:", err.response.data.message);
    }
  };

  return { control, handleLogin, errors, handleSubmit };
};

export default useRegister;
