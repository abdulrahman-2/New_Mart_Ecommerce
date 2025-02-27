import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

function Success() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCartStore();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      clearCart();
    }
  }, [clearCart, searchParams]);

  return (
    <Box
      h="calc(100vh - 80px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m={3}
    >
      <Box
        bg={{ base: "gray.100", _dark: "gray.800" }}
        p={6}
        rounded="lg"
        shadow="sm"
        textAlign="center"
        maxW="md"
      >
        <Icon
          as={MdCheckCircle}
          w={28}
          h={28}
          color="green.500"
          mx="auto"
          my={6}
        />
        <Heading as="h3" size="lg" color={{ base: "gray.800", _dark: "white" }}>
          Payment Done!
        </Heading>
        <Text color={{ base: "gray.800", _dark: "white" }} my={2}>
          Thank you for completing your secure online payment.
        </Text>
        <Text>Have a great day!</Text>
        <VStack gap={4} py={10}>
          <Button colorScheme="green" w="full">
            <Link to="/">continue shopping</Link>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Success;
