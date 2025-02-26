import { registerFields } from "@/components/forms/inputsFields";
import UseFormGeneric from "@/components/forms/UseFormGeneric";
import CustomText from "@/components/shared/CustomText";
import { toaster } from "@/components/ui/toaster";
import { registerSchema } from "@/schema/zod";
import { useUserStore } from "@/store/user";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser, loading, error } = useUserStore();
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    const { success, message } = await createUser(data);
    toaster.create({ title: message, type: success ? "success" : "error" });
    if (success) navigate("/login");
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
        title="Sign Up"
        isLink={false}
        baseSize="22px"
        smSize="26px"
      />
      <Box w={{ base: "full", md: "500px" }}>
        <UseFormGeneric
          onSubmit={handleCreate}
          schema={registerSchema}
          loading={loading}
          buttonText="Sign Up"
          formFields={registerFields}
          error={error || ""}
        />
      </Box>
      <Box mt={"20px"} w={{ base: "full", md: "500px" }} textAlign={"center"}>
        <CustomText
          title="Already have an account?"
          isLink={true}
          href="/signin"
        />
      </Box>
    </Box>
  );
};

export default SignUp;
