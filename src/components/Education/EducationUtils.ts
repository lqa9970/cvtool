import * as Yup from "yup";
import { Education } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";

export const defaultStartDate = new Date("1/1/1970");
export const defaultEndDate = new Date("31/12/1970");

const regex = new RegExp('^[\\p{L}\\p{M}\\s-]*$','gu'); // Matches strings with only Unicode letters, mark characters, spaces, and hyphens
const regexWithSpecialCharacters = new RegExp('^[\\p{L}\\p{M}\\p{N}\\s\'-,.+’"]*$', 'gu');
export const educationSchema = Yup.object().shape({
  id: Yup.string().required(),
  school: Yup.string().min(4, "Too Short").max(200,"Character limit exceeded").required("Required").matches(regex, 'Not a valid institution'),
  degree: Yup.string().min(4, "Too Short!").max(200,"Character limit exceeded").required("Required").matches(regex, 'Not a valid degree'),
  startMonthYear: Yup.string().required(),
  endMonthYear: Yup.string().required(),
  degreeDescription: Yup.string().required().max(1250,"Character limit exceeded").matches(regexWithSpecialCharacters, 'Not a valid description'),
});

export const initialValues: Education = {
  id: uniqueIdGenerator(),
  school: "",
  degree: "",
  startMonthYear: "09/09/2016",
  endMonthYear: "10/09/2023",
  degreeDescription: "",
};
