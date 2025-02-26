import { FieldConfig } from "@/types";

export const addProductFields: FieldConfig[] = [
  {
    name: "name",
    label: "Product Name",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    name: "description",
    label: "Product Description",
    type: "textarea",
    placeholder: "Enter product description",
    resize: "none",
  },
  {
    name: "price",
    label: "Product Price",
    type: "number",
    placeholder: "Enter product price",
    step: "0.01",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Enter category",
  },
  {
    name: "discount",
    label: "Discount",
    type: "number",
    placeholder: "Enter discount",
    step: "0.01",
  },
  {
    name: "image",
    label: "Image URL",
    type: "text",
    placeholder: "Enter image URL",
  },
];

export const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
];

export const registerFields: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm password",
  },
];
