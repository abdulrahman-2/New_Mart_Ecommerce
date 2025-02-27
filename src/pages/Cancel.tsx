import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

function Cancel() {
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
        <Icon as={MdCancel} w={28} h={28} color="red.500" mx="auto" my={6} />
        <Heading as="h3" size="lg" color={{ base: "gray.800", _dark: "white" }}>
          Payment Canceled
        </Heading>
        <Text color={{ base: "gray.800", _dark: "white" }} my={2}>
          Your payment was not completed. If this was a mistake, you can try
          again.
        </Text>
        <Text>Feel free to reach out for support.</Text>
        <VStack gap={4} py={10}>
          <Button colorScheme="red" w="full">
            <Link to="/cart">Try Again</Link>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Cancel;
