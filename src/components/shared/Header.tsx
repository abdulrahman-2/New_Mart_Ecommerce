import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import { Link } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import CustomText from "./CustomText";

const Header = () => {
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
            <Link to="/admin">
              <Button variant="outline" size="sm" px={3}>
                Admin
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="outline" size="sm">
                <FiShoppingCart size={20} />
              </Button>
            </Link>

            <ModeToggle />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
