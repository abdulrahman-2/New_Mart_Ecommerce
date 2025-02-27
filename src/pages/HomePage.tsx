import CustomText from "@/components/shared/CustomText";
import Empty from "@/components/shared/Empty";
import ProductCard from "@/components/shared/ProductCard";
import { useProductStore } from "@/store/product";
import {
  Box,
  Container,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { PiBatteryVerticalEmptyLight } from "react-icons/pi";

const HomePage = () => {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container my={"20px"}>
      <VStack gap={5}>
        <CustomText
          title="Current Products 🚀"
          isLink={false}
          baseSize="25px"
          smSize="30px"
        />
        {loading ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"full"}
            minH={"calc(100vh - 150px)"}
          >
            <Spinner size={"xl"} color="blue.solid" />
          </Box>
        ) : error ? (
          <Text color={"red.500"}> {error} </Text>
        ) : products.length === 0 ? (
          <Empty
            icon={<PiBatteryVerticalEmptyLight />}
            title="No Products Yet"
          />
        ) : (
          <SimpleGrid w={"full"} columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
