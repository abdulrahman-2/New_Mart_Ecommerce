import { useCartStore } from "@/store/cart";
import { IProduct } from "@/types";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { toaster } from "../ui/toaster";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart } = useCartStore();

  const cartItem = cart.find((item) => item._id === product._id);

  const { _id, name, image, price, discount } = product;

  const handleAddToCart = () => {
    addToCart(product);
    toaster.create({
      title: `${name.slice(0, 15)} added to cart`,
      type: "success",
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.5s"}
      _hover={{ transform: "translateY(-8px) ", shadow: "xl" }}
      bg={{ base: "gray.100", _dark: "gray.800" }}
    >
      <Link to={`/product/${_id}`}>
        <Image src={image} alt={name} h={"52"} w={"full"} objectFit="cover" />
      </Link>
      <Box p={3} spaceY={3}>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          color={{ base: "gray.800", _dark: "gray.100" }}
        >
          {name}
        </Text>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text
            fontSize={"lg"}
            color={{ base: "gray.800", _dark: "gray.100" }}
            fontWeight={"semibold"}
          >
            ${(price - (price * discount) / 100).toFixed(2)}
          </Text>
          <Text
            textDecoration={"line-through"}
            fontSize={"lg"}
            color={{ base: "gray.800", _dark: "gray.100" }}
            fontWeight={"semibold"}
          >
            ${price}
          </Text>
        </Box>

        <Button
          bgGradient="to-r"
          gradientFrom="gray.600"
          gradientTo="gray.800"
          color={cartItem ? "green.500" : "white"}
          fontWeight={"bold"}
          border={"none"}
          w={"full"}
          onClick={handleAddToCart}
        >
          {cartItem ? "Added to cart" : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
