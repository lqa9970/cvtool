import * as Yup from "yup";
import { formatDate } from "../../utils/date";

const currentDate = new Date();
const futureDate = new Date(
  currentDate.getFullYear() + 2,
  currentDate.getMonth(),
  currentDate.getDay()
);

export const defaultStartDate = formatDate(currentDate);
export const defaultEndDate = formatDate(futureDate);

export const certificationSchema = Yup.object().shape({
  name: Yup.string().required("Certificate is required"),
  validFrom: Yup.string().required("Valid starting date is required"),
  validTo: Yup.string().required("Valid to date is required"),
});