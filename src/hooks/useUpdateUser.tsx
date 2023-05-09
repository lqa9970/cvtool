import { useContext } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firestoreService';
import { NotificationContext } from '../context/NotificationContext';

const useUpdateUser = () => {
  const { showNotification } = useContext(NotificationContext);

  const updateUser = async (
    dataToUpdate: Array<object> | object,
    id: string
  ) => {
    const user = doc(db, 'users', id);
    await updateDoc(user, dataToUpdate)
      .then((response) => {
        showNotification({message: "Updated Successfully!", type: "success"})
      })
      .catch((error) => {
        console.log('useUpdateUser error: ', error.message);
        showNotification({message: "Error occured", type: "error"})
      });
  };

  return [updateUser];
};

export default useUpdateUser;
