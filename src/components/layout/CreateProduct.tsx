import { useProductStore } from "@/store/product";
import ProductForm from "@/components/forms/ProductForm";
import CustomText from "@/components/shared/CustomText";
import { toaster } from "../ui/toaster";

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
      <ProductForm
        onSubmit={handleCreate}
        loading={loading}
        error={error || ""}
        buttonText="Submit"
      />
    </div>
  );
};

export default CreateProduct;
