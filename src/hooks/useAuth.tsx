import { useAppSelector } from "@/store/hooks";
import type { User } from "@/types/authTypes";

const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  return {
    user: user as User | null,
    isAuthenticated: !!(user as User | null)?.accessToken,
    isLoading: user === undefined,
  };
};

export default useAuth;
