import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { save } from "../redux/slices/userSlice";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { signupRequest } from "@/api/auth";

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

  const handleSignup = async (data: RegisterFormValues) => {
    console.log("Signup initiated with data:", data);

    // Simple password match validation
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signupRequest(data);
      console.log("🚀 ~ handleSignup ~ response:", response);

      console.log(
        "Signup request successful, dispatching login and save actions",
      );
      dispatch(login(response.token));
      dispatch(
        save({
          email: response.email,
          id: response.id,
          username: response.username,
          name: response.name,
        }),
      );

      console.log("Redirecting to home page");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error during signup:", err.message);
      alert(err.message || "An error occurred. Please try again.");
    }
  };

  return { control, handleSignup, getValues, errors, handleSubmit };
};

export default useRegister;
