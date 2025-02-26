import { useUserStore } from "@/store/user";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLoggedIn, getUser, user, loading } = useUserStore();

  useEffect(() => {
    if (isLoggedIn && !user) {
      getUser();
    }
  }, [isLoggedIn, user, getUser]);

  if (loading)
    return (
      <Box
        h={"calc(100vh - 100px)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner color={"blue.solid"} size={"xl"} />
      </Box>
    );

  return user?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
