import { useProductStore } from "@/store/product";
import CustomText from "@/components/shared/CustomText";
import { toaster } from "../ui/toaster";
import { addProductFields } from "../forms/inputsFields";
import UseFormGeneric from "../forms/UseFormGeneric";
import { Box } from "@chakra-ui/react";
import { createAndUpdateSchema } from "@/schema/zod";

const CreateProduct = () => {
  const { createProduct, loading, error } = useProductStore();

  const handleCreate = async (data: any) => {
    const { success, message } = await createProduct(data);
    toaster.create({ title: message, type: success ? "success" : "error" });
  };

  return (
    <div className="form-container">
      <CustomText
        title="Create Product"
        isLink={false}
        baseSize="22px"
        smSize="26px"
      />
      <Box>
        <UseFormGeneric
          onSubmit={handleCreate}
          schema={createAndUpdateSchema}
          loading={loading}
          buttonText="Add Product"
          formFields={addProductFields}
          error={error || ""}
        />
      </Box>
    </div>
  );
};

export default CreateProduct;
