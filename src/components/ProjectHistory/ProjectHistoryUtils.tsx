import * as Yup from "yup";
import { ProjectHistory } from "../../types/types";
import { uniqueIdGenerator } from "../../utils/uid";

export const defaultStartDate = new Date("1/1/2015");
export const defaultEndDate = new Date("31/12/2020");

const regex = new RegExp('^[\\p{L}\\p{M}\\s-]*$','gu'); // Matches strings with only Unicode letters, mark characters, spaces, and hyphens
const regexWithSpecialCharacters = new RegExp('^[\\p{L}\\p{M}\\p{N}\\s\'-,.+’"]*$', 'gu');
export const projectHistorySchema = Yup.object().shape({
  id: Yup.string().required(),
  role: Yup.string().min(4, "Too Short").max(100,"Character limit exceeded").required("Required").matches(regex, 'Not a valid role'),
  projectTitle: Yup.string().min(4, "Too Short!").max(100,"Character limit exceeded").required("Required").matches(regex, 'Not a valid title'),
  startMonthYear: Yup.string().required(),
  endMonthYear: Yup.string().required(),
  currentlyInProject: Yup.boolean(),
  projectDescription: Yup.string().required().max(2500,"Character limit exceeded").matches(regexWithSpecialCharacters, 'Not a valid description'),
  accountName: Yup.string().max(100,"Character limit exceeded").matches(regex, 'Not a valid name'),
  industry: Yup.string(),
  skills: Yup.array(
    Yup.object({
      id: Yup.string(),
      name: Yup.string(),
    })
  ),
});

export const initialValues: ProjectHistory = {
  id: uniqueIdGenerator(),
  role: "",
  projectTitle: "",
  startMonthYear: "09-09-2016",
  endMonthYear: "10-09-2023",
  currentlyInProject: false,
  projectDescription: "",
  accountName: "",
  industry: "",
  skills: [],
};
