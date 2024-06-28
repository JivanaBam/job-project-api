import yup from "yup";

export const registerValidationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required.")
    .trim()
    .max(50, "Full name must be at max 50 characters."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required.")
    .trim()
    .max(65, "Email must be at max 65 characters.")
    .lowercase(),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .max(20, "Password must be at max 20 characters.")
    .required("Password is required"),
  role: yup
    .string()
    .required("Role is required.")
    .trim()
    .oneOf(["admin", "user"], "Role must be either admin or user."),
});

export const loginUserValidationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email.")
    .required("Email is required.")
    .trim()
    .max(60, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup.string().required("Password is required.").trim(),
});
