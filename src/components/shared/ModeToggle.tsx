import { Box, ClientOnly, Flex, Skeleton } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

const ModeToggle = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <Box onClick={toggleColorMode}>
        {colorMode === "light" ? (
          <Flex cursor={"pointer"} w={"full"} alignItems={"center"} gap={1}>
            <LuSun /> Dark
          </Flex>
        ) : (
          <Flex cursor={"pointer"} w={"full"} alignItems={"center"} gap={1}>
            <LuMoon /> Light
          </Flex>
        )}
      </Box>
    </ClientOnly>
  );
};

export default ModeToggle;
