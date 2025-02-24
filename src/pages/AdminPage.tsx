import Taps from "@/components/layout/Taps";
import CustomText from "@/components/shared/CustomText";
import { Container, Flex } from "@chakra-ui/react";

const AdminPage = () => {
  return (
    <Container mt={"20px"} maxW={"container.lg"} mx={"auto"}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <CustomText
          title="Admin Dashboard 🔒"
          isLink={false}
          baseSize="25px"
          smSize="30px"
        />
        <Taps />
      </Flex>
    </Container>
  );
};

export default AdminPage;
