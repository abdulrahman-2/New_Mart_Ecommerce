import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProductStore } from "@/store/product";
import { IProduct } from "@/types";
import { toaster } from "@/components/ui/toaster";
import { Button } from "@chakra-ui/react";
import UseFormGeneric from "@/components/forms/UseFormGeneric";
import { addProductFields } from "@/components/forms/inputsFields";
import { createAndUpdateSchema } from "@/schema/zod";

const EditDialog = ({ product }: { product: IProduct }) => {
  const { editProduct, loading, error } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async (data: IProduct) => {
    const { success, message } = await editProduct(product._id || "", data);
    toaster.create({ title: message, type: success ? "success" : "error" });
    setIsOpen(false);
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <BiEditAlt
          style={{ cursor: "pointer" }}
          size={25}
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <UseFormGeneric
            schema={createAndUpdateSchema}
            formFields={addProductFields}
            initialValues={product}
            onSubmit={handleEdit}
            loading={loading}
            error={error || ""}
            buttonText="Save"
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default EditDialog;
