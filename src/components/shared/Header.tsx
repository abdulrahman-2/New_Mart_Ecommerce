import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";
import CustomText from "./CustomText";
import CustomDropdown from "./CustomDropdown";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

const Header = () => {
  const { isLoggedIn, getUser, user } = useUserStore();
  const { cart } = useCartStore();

  useEffect(() => {
    if (isLoggedIn && !user) {
      getUser();
    }
  }, [isLoggedIn, user, getUser]);
  return (
    <Box
      w="100%"
      bg={{ base: "gray.100", _dark: "gray.800" }}
      shadow="md"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Container maxW="1280px" mx="auto" px={4}>
        <Flex h="16" alignItems="center" justify="space-between">
          <CustomText
            title="NeoMart 🛒"
            isLink={true}
            baseSize="22px"
            smSize="26px"
          />
          <Stack direction="row" alignItems="center">
            {user?.isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" px={3}>
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/cart">
              <Button variant="outline" size="sm" p={0}>
                <FiShoppingCart size={20} />
                <Box
                  bgGradient="to-r"
                  gradientFrom="cyan.400"
                  gradientTo="blue.500"
                  bgClip="text"
                  fontWeight={"bold"}
                  position={"absolute"}
                  top={-1}
                  right={-1}
                  ml={2}
                >
                  {cart.length}
                </Box>
              </Button>
            </Link>

            <CustomDropdown />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
