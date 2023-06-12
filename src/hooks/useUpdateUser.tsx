import { useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { NotificationContext } from "../context/NotificationContext";
import { db as database } from "../services/firestoreService";

const useUpdateUser = () => {
  const { showNotification } = useContext(NotificationContext);

  const updateUser = async (dataToUpdate: object[] | object, id: string) => {
    const user = doc(database, "users", id);
    await updateDoc(user, dataToUpdate)
      .then((_response) => {
        showNotification({ message: "Updated Successfully!", type: "success" });
      })
      .catch((error: Error) => {
        console.log("useUpdateUser error:", error.message);
        showNotification({ message: "Error occured", type: "error" });
      });
  };

  return [updateUser];
};

export default useUpdateUser;
