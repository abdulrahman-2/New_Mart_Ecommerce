import { loginFields } from "@/components/forms/inputsFields";
import UseFormGeneric from "@/components/forms/UseFormGeneric";
import CustomText from "@/components/shared/CustomText";
import { toaster } from "@/components/ui/toaster";
import { loginSchema } from "@/schema/zod";
import { useUserStore } from "@/store/user";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { loginUser, loading, error } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    const { success, message } = await loginUser(data);
    toaster.create({ title: message, type: success ? "success" : "error" });
    if (success) navigate("/");
  };
  return (
    <Box
      mx={3}
      h={"calc(100vh - 100px)"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CustomText
        title="Sign In"
        isLink={false}
        baseSize="22px"
        smSize="26px"
      />
      <Box w={{ base: "full", md: "500px" }}>
        <UseFormGeneric
          onSubmit={handleLogin}
          schema={loginSchema}
          loading={loading}
          buttonText="Sign In"
          formFields={loginFields}
          error={error || ""}
        />
      </Box>
      <Box mt={"20px"} w={{ base: "full", md: "500px" }} textAlign={"center"}>
        <CustomText
          title="Don't have an account?"
          isLink={true}
          href="/signup"
        />
      </Box>
    </Box>
  );
};

export default SignIn;
