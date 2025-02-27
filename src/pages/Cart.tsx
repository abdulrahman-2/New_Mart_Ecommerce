import CustomText from "@/components/shared/CustomText";
import Empty from "@/components/shared/Empty";
import { toaster } from "@/components/ui/toaster";
import { useCartStore } from "@/store/cart";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { PiBatteryVerticalEmptyLight } from "react-icons/pi";

import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "@/lib/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    loading,
    error,
  } = useCartStore();

  const handleIncrement = (id: string) => {
    incrementQuantity(id);
    toaster.create({ title: "Quantity increased", type: "success" });
  };
  const handleDecrement = (id: string) => {
    decrementQuantity(id);
    toaster.create({ title: "Quantity decreased", type: "success" });
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    toaster.create({ title: "Product removed", type: "success" });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const createCheckout = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axiosInstance.post("/api/payments", {
      products: cart,
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.sessionId,
    });

    if (result?.error) {
      toaster.create({ title: result.error.message, type: "error" });
    }
  };

  return (
    <Box m={3}>
      {cart.length !== 0 ? (
        <Box
          w={{ base: "full", sm: "500px", md: "700px" }}
          mx="auto"
          my={"20px"}
        >
          <CustomText
            title="Cart"
            isLink={false}
            baseSize="25px"
            smSize="30px"
          />
          <Box my={"20px"}>
            <Grid
              bg={{ base: "gray.200", _dark: "gray.800" }}
              p="4"
              rounded="lg"
              textAlign="center"
              templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(5, 1fr)" }}
              gap="6"
              fontWeight="bold"
            >
              <Box>Product</Box>
              <Box>Price</Box>
              <Box>Quantity</Box>
              <Box display={{ base: "none", md: "block" }}>Total</Box>
              <Box>Actions</Box>
            </Grid>

            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                w="full"
                minH="calc(100vh - 350px)"
              >
                <Spinner size="xl" color="blue.500" />
              </Box>
            ) : error ? (
              <Text textAlign={"center"} color="red.500">
                {error}
              </Text>
            ) : (
              <Box
                display={"flex"}
                flexDir={"column"}
                gap={2}
                maxH="400px"
                overflowY="scroll"
              >
                {cart.map((product) => (
                  <Grid
                    alignItems="center"
                    key={product._id}
                    bg={{ base: "gray.100", _dark: "gray.700" }}
                    p="4"
                    rounded="lg"
                    textAlign="center"
                    templateColumns={{
                      base: "repeat(4, 1fr)",
                      md: "repeat(5, 1fr)",
                    }}
                    gap="6"
                    fontWeight={"semibold"}
                  >
                    <Box display="flex" alignItems="center" gap="2">
                      <Image
                        src={product.image}
                        boxSize="60px"
                        borderRadius="lg"
                        fit="cover"
                        alt={product.name}
                      />
                      <Text
                        display={{ base: "none", md: "block" }}
                        textWrap="nowrap"
                      >
                        {product.name}
                      </Text>
                    </Box>
                    <Text>${product.price}</Text>
                    <Flex gap={2} alignItems="center" justifyContent="center">
                      <Flex
                        bg={{ base: "gray.700", _dark: "gray.100" }}
                        color={{ base: "gray.100", _dark: "gray.700" }}
                        w={"25px"}
                        h={"25px"}
                        cursor={"pointer"}
                        fontSize={"2xl"}
                        rounded="lg"
                        alignItems={"center"}
                        justifyContent={"center"}
                        onClick={() => handleDecrement(product._id as string)}
                      >
                        -
                      </Flex>
                      {product.quantity}
                      <Flex
                        bg={{ base: "gray.700", _dark: "gray.100" }}
                        color={{ base: "gray.100", _dark: "gray.700" }}
                        w={"25px"}
                        h={"25px"}
                        cursor={"pointer"}
                        fontSize={"2xl"}
                        rounded="lg"
                        alignItems={"center"}
                        justifyContent={"center"}
                        onClick={() => handleIncrement(product._id as string)}
                      >
                        +
                      </Flex>
                    </Flex>
                    <Text display={{ base: "none", md: "block" }}>
                      {product.quantity && product.quantity * product.price}
                    </Text>
                    <Box mx="auto" display="flex" alignItems="center" gap={1}>
                      <MdDeleteForever
                        size={25}
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleRemove(product._id as string)}
                      />
                    </Box>
                  </Grid>
                ))}
              </Box>
            )}
          </Box>
          <Box
            w={{ base: "full", sm: "270px" }}
            bg={{ base: "gray.100", _dark: "gray.700" }}
            rounded={"lg"}
            ml={"auto"}
            p={4}
          >
            <CustomText
              title="Summary"
              isLink={false}
              baseSize="20px"
              smSize="23px"
            />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              my="4"
              fontWeight="bold"
            >
              <Text>Subtotal</Text>
              <Text>${totalPrice}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              my="4"
              fontWeight="bold"
            >
              <Text>shopping fee</Text>
              <Text>free</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              my="4"
              fontWeight="bold"
            >
              <Text>total</Text>
              <Text>${totalPrice}</Text>
            </Flex>
            <Button
              bgGradient="to-r"
              gradientFrom="gray.600"
              gradientTo="gray.800"
              color={"white"}
              fontWeight={"bold"}
              border={"none"}
              w={"full"}
              onClick={createCheckout}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Empty icon={<PiBatteryVerticalEmptyLight />} title="Cart is empty" />
      )}
    </Box>
  );
};

export default Cart;
