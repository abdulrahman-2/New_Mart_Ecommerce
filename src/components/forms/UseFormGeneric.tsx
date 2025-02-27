import {
  Button,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormProps } from "@/types";

const UseFormGeneric = <T extends FieldValues>({
  initialValues,
  onSubmit,
  loading,
  error,
  buttonText,
  formFields,
  schema,
}: ProductFormProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack gap="4">
        {formFields.map((field) => (
          <Field
            key={field.name}
            label={field.label}
            invalid={!!errors[field.name as Path<T>]}
            errorText={errors[field.name as Path<T>]?.message as string}
          >
            {field.type === "textarea" ? (
              <Textarea
                {...register(field.name as Path<T>)}
                bg={{ base: "gray.200", _dark: "gray.700" }}
                h={`${100}px`}
                resize={field.resize}
                placeholder={field.placeholder}
              />
            ) : (
              <Input
                {...register(field.name as Path<T>, {
                  valueAsNumber: field.type === "number",
                })}
                type={field.type}
                step={field.step}
                bg={{ base: "gray.200", _dark: "gray.700" }}
                placeholder={field.placeholder}
              />
            )}
          </Field>
        ))}

        {error && <Text color="red">{error}</Text>}

        <Button
          bgGradient="to-r"
          gradientFrom="cyan.600"
          gradientTo="blue.800"
          color={"white"}
          fontSize={"md"}
          border={"none"}
          type="submit"
        >
          {loading ? <Spinner /> : buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default UseFormGeneric;
