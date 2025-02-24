import CustomText from "@/components/shared/CustomText";
import { useProductStore } from "@/store/product";
import {
  Box,
  Container,
  HStack,
  Image,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = products.find((item) => item._id === id);
  return (
    <Container my={"20px"}>
      <VStack gap={5}>
        <CustomText
          title="Product Details 🚀"
          isLink={false}
          baseSize="25px"
          smSize="30px"
        />
        <HStack
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={10}
          my={10}
        >
          <Image
            src={product?.image}
            alt={product?.name}
            rounded={"lg"}
            h={{ base: "300px", md: "400px" }}
          />
          <Box spaceY={5}>
            <Box fontSize={"2xl"} display={"flex"} gap={4}>
              Name:
              <Text fontWeight={"bold"}>{product?.name}</Text>
            </Box>

            <Box fontSize={"2xl"} display={"flex"} gap={4}>
              Product Price:
              <Text
                fontSize={"3xl"}
                bgGradient="to-r"
                gradientFrom="cyan.400"
                gradientTo="blue.500"
                bgClip="text"
                fontWeight={"bold"}
              >
                $
                {product?.price &&
                  (
                    product?.price -
                    (product?.price * product?.discount) / 100
                  ).toFixed(2)}
              </Text>
            </Box>

            <Box fontSize={"2xl"} display={"flex"} gap={4}>
              Description:
              <Text fontWeight={"medium"}>{product?.description}</Text>
            </Box>

            <Box fontSize={"2xl"} display={"flex"} gap={4}>
              Category:
              <Text fontSize={"2xl"} fontWeight={"medium"}>
                {product?.category}
              </Text>
            </Box>

            <HStack mt={4}>
              <Button size="md">Add to Cart</Button>
              <Button size="md">Buy Now</Button>
            </HStack>
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ProductPage;
