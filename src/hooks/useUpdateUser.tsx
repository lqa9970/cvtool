import { useContext } from "react";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { ActivityContext } from "../context/ActivityContext";
import { NotificationContext } from "../context/NotificationContext";
import { database } from "../services/firestoreService";
import { IActivity } from "../types/types";

const useUpdateUser = () => {
  const { showNotification } = useContext(NotificationContext);
  const { sortAddActivity } = useContext(ActivityContext);

  const updateUser = async (dataToUpdate: object[] | object, id: string) => {
    const user = doc(database, "users", id);
    const dataWithActivity = addActivityData(dataToUpdate, sortAddActivity);

    try {
      await updateDoc(user, dataWithActivity);
      showNotification({ message: "Updated Successfully!", type: "success" });
    } catch (error) {
      console.log(error);
      showNotification({ message: "Error occured", type: "error" });
    }
  };

  return [updateUser];
};

const addActivityData = (
  dataToUpdate: object[] | object,
  sortAddActivity: (newActivity: IActivity) => void
) => {
  const date = Timestamp.fromDate(new Date());
  const updateDate = { last_cv_update: date };
  const keys = Object.keys(dataToUpdate);

  if (!keys[0]) {
    return { ...dataToUpdate, ...updateDate };
  }

  const activityMessage = `Updated ${keys[0].replace("_", " ")}`;
  const newActivity = { message: activityMessage, date };
  const addActivities = sortAddActivity(newActivity);
  const activities = { activity: addActivities };

  return { ...dataToUpdate, ...updateDate, ...activities };
};

export default useUpdateUser;
