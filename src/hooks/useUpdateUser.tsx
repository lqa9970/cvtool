import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firestoreService';

const useUpdateUser = () => {
  const updateUser = async (
    dataToUpdate: Array<object> | object,
    id: string
  ) => {
    const user = doc(db, 'users', id);
    console.log(user);
    await updateDoc(user, dataToUpdate)
      .then((response) => {
        console.log('user data updated', response);
      })
      .catch((error) => {
        console.log('error: ', error.message);
      });
  };

  return [updateUser];
};

export default useUpdateUser;
