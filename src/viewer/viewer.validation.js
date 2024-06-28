import yup from "yup";

export const viewerValidationSchema = yup.object({
  id: yup.number().required("Id is required."),
  name: yup
    .string()
    .required("Name is required.")
    .trim()
    .max(60, "Name must be at max 60 characters."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required.")
    .trim()
    .max(65, "Email must be at max 60 characters.")
    .lowercase(),
});
