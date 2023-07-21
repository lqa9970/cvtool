import * as Yup from "yup";

const currentDate = new Date();
const futureDate = new Date(
  currentDate.getFullYear() + 2,
  currentDate.getMonth(),
  currentDate.getDay()
);

export const defaultStartDate = convertDate(currentDate);
export const defaultEndDate = convertDate(futureDate);

export const certificationSchema = Yup.object().shape({
  name: Yup.string().required("Certificate is required"),
  validFrom: Yup.string().required("Valid starting date is required"),
  validTo: Yup.string().required("Valid to date is required"),
});

function convertDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
