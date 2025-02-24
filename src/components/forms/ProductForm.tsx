import {
  Button,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schema/zod";

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialValues?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  loading: boolean;
  error?: string;
  buttonText: string;
}

const ProductForm = ({
  initialValues,
  onSubmit,
  loading,
  error,
  buttonText,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {},
  });

  const handleFormSubmit = async (data: FormValues) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="4">
        <Field
          label="Product Name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
        >
          <Input
            {...register("name")}
            bg={{ base: "gray.200", _dark: "gray.700" }}
          />
        </Field>

        <Field
          label="Product Description"
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Textarea
            {...register("description")}
            bg={{ base: "gray.200", _dark: "gray.700" }}
            h="100px"
            resize="none"
          />
        </Field>

        <Field
          label="Product Price"
          invalid={!!errors.price}
          errorText={errors.price?.message}
        >
          <Input
            {...register("price")}
            type="number"
            step="0.01"
            bg={{ base: "gray.200", _dark: "gray.700" }}
          />
        </Field>

        <Field
          label="Category"
          invalid={!!errors.category}
          errorText={errors.category?.message}
        >
          <Input
            {...register("category")}
            bg={{ base: "gray.200", _dark: "gray.700" }}
          />
        </Field>

        <Field
          label="Discount"
          invalid={!!errors.discount}
          errorText={errors.discount?.message}
        >
          <Input
            {...register("discount")}
            type="number"
            step="0.01"
            bg={{ base: "gray.200", _dark: "gray.700" }}
          />
        </Field>

        <Field
          label="Image URL"
          invalid={!!errors.image}
          errorText={errors.image?.message}
        >
          <Input
            {...register("image")}
            bg={{ base: "gray.200", _dark: "gray.700" }}
          />
        </Field>

        {error && <Text color="red">{error}</Text>}

        <Button
          bgGradient="to-r"
          gradientFrom="cyan.600"
          gradientTo="blue.800"
          color={"white"}
          fontSize={"md"}
          type="submit"
        >
          {loading ? <Spinner /> : buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
