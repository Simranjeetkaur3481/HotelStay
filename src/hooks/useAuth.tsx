import { useAppSelector } from "@/store/hooks";

const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  return {
    user,
    isAuthenticated: !!user?.accessToken,
    isLoading: user === undefined,
  };
};

export default useAuth;
