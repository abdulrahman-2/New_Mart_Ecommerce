import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/shared/Header";
import { Toaster } from "./components/ui/toaster";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PublicRoutes from "./utils/PublicRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
