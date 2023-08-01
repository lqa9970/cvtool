import * as Yup from "yup";

export const skillSchema = Yup.object().shape({
  name: Yup.string().required("A skill is required"),
  experience: Yup.number()
    .required("Experience is required")
    .integer("Experience must be an integer")
    .min(0, "Experience cannot be less than 0")
    .max(20, "Experience cannot be more than 20"),
});
