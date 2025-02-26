import { Button } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { BiUser } from "react-icons/bi";
import ModeToggle from "./ModeToggle";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

const CustomDropdown = () => {
  const { getUser, logoutUser, user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleLogout = async () => {
    const res = await logoutUser();
    const { success, message } = res;
    if (success) {
      toaster.create({ title: message, type: "success" });
      navigate("/");
    }
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button p={0} variant="outline" size="sm">
          <BiUser />
        </Button>
      </MenuTrigger>
      <MenuContent>
        {user ? (
          <>
            <MenuItem value="email">{user.email}</MenuItem>
            <MenuItem value="name">{user.name}</MenuItem>
            <MenuItem
              color={"red"}
              cursor={"pointer"}
              value="logout"
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem value="signin">
              <Link style={{ width: "100%", outline: "none" }} to="/signin">
                Login
              </Link>
            </MenuItem>
            <MenuItem value="signup">
              <Link style={{ width: "100%", outline: "none" }} to="/signup">
                Signup
              </Link>
            </MenuItem>
          </>
        )}

        <MenuItem value="toggle-mode">
          <ModeToggle />
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default CustomDropdown;
