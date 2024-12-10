import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { save } from "../redux/slices/userSlice";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { signupRequest } from "@/api/auth";
import { toast } from "@/common/toast";
import { handleToastError } from "@/utils/utils";
import { log } from "@/common/logger";

export interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useRegister = () => {
  // Use the interface for type safety
  const {
    control,
    handleSubmit,
    getValues, // Extract getValues from useForm
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async (signupData: RegisterFormValues) => {
    log.info("Signup initiated with data:", signupData);

    // Simple password match validation
    if (signupData.password !== signupData.confirmPassword) {
      log.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      const { error, data } = await signupRequest(signupData);
      console.log("🚀 ~ handleSignup ~ response:", data);
      log.info("Signup request successful, dispatching login and save actions");
      if (!error) {
        toast.success("User created!");
        dispatch(login(data.token!));
        dispatch(
          save({
            email: data.data.email,
            id: data.data.id,
            username: data.data.username,
            name: data.data.name,
          }),
        );
        log.info("Redirecting to home page");
        router.push("/dashboard");
      }
    } catch (err: any) {
      log.error("Error during signup:", err.message);
      handleToastError(err);
    }
  };
  return { control, handleSignup, getValues, errors, handleSubmit };
};

export default useRegister;
