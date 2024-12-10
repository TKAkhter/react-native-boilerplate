import { log } from "@/common/logger";
import { toast } from "@/common/toast";
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
    log.error(error);
    return false;
  }
};

export const handleToastError = (error: any) => {
  try {
    const { response } = error;
    if (response.data) {
      if (Array.isArray(response.data.issues)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let errorArray: string[] = [];
        response.data.issues.forEach((issue: any) => {
          errorArray.push(`${issue.message} \n`);
        });
        return toast.error(errorArray.join(""));
      }
      return toast.error(response.data.message);
    } else {
      return toast.error(
        error.message || "An error occurred. Please try again.",
      );
    }
  } catch (err: any) {
    log.info(err);
    return toast.error("An error occurred. Please try again.");
  }
};
