import { useProductStore } from "@/store/product";
import { Box, Grid, Image, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import DeleteDialog from "../shared/Dialogs/DeleteDialog";
import { toaster } from "../ui/toaster";
import EditDialog from "../shared/Dialogs/EditDialog";

const DashboardProducts = () => {
  const { products, fetchProducts, deleteProduct, loading, error } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toaster.create({
        title: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: message,
        type: "success",
      });
    }
  };

  return (
    <Box>
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
        <Box>Category</Box>
        <Box display={{ base: "none", md: "block" }}>Discount</Box>
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
          maxH="535px"
          overflowY="scroll"
        >
          {products.map((product) => (
            <Grid
              alignItems="center"
              key={product._id}
              bg={{ base: "gray.100", _dark: "gray.700" }}
              p="4"
              rounded="lg"
              textAlign="center"
              templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(5, 1fr)" }}
              gap="6"
            >
              <Box display="flex" alignItems="center" gap="2">
                <Image
                  src={product.image}
                  boxSize="50px"
                  borderRadius="full"
                  fit="cover"
                  alt={product.name}
                />
                <Text display={{ base: "none", md: "block" }} textWrap="nowrap">
                  {product.name}
                </Text>
              </Box>
              <Text>${product.price}</Text>
              <Text>{product.category}</Text>
              <Text display={{ base: "none", md: "block" }}>
                {product.discount}%
              </Text>
              <Box mx="auto" display="flex" alignItems="center" gap={1}>
                <DeleteDialog
                  onClick={() => handleDelete(product._id as string)}
                />
                <EditDialog product={product} />
              </Box>
            </Grid>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DashboardProducts;
