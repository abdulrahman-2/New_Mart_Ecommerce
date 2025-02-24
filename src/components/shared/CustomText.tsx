import { ICustomText } from "@/types";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CustomText = ({
  title,
  isLink,
  baseSize,
  smSize,
}: ICustomText) => {
  return (
    <Text
      fontSize={{ base: baseSize, sm: smSize }}
      fontWeight="bold"
      textTransform="uppercase"
      textAlign="center"
      bgGradient="to-r"
      gradientFrom="cyan.400"
      gradientTo="blue.500"
      bgClip="text"
    >
      {isLink ? <Link to="/">{title}</Link> : title}
    </Text>
  );
};

export default CustomText;
