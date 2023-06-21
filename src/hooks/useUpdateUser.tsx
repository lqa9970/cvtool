import { useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { NotificationContext } from "../context/NotificationContext";
import { database } from "../services/firestoreService";

const useUpdateUser = () => {
  const { showNotification } = useContext(NotificationContext);

  const updateUser = async (dataToUpdate: object[] | object, id: string) => {
    const user = doc(database, "users", id);
    const updateDate = { last_cv_update: new Date() };

    await updateDoc(user, dataToUpdate)
      .then(() => updateDoc(user, updateDate)) // updating the last cv edit date
      .then(() => showNotification({ message: "Updated Successfully!", type: "success" }))
      .catch((error: Error) => {
        console.log("useUpdateUser error:", error.message);
        showNotification({ message: "Error occured", type: "error" });
      });
  };

  return [updateUser];
};

export default useUpdateUser;
