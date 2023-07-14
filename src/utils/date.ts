import { IActivity } from "../types/types";

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).padStart(4, "0");

  return `${day}.${month}.${year}`;
};

export const activitySortFunction = (a: IActivity, b: IActivity) => {
  const dateA = a.date.toDate();
  const dateB = b.date.toDate();
  return Number(dateB) - Number(dateA);
};
