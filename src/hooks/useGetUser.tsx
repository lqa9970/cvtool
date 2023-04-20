import { useState, useEffect } from 'react';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '../services/firestoreService';
import { EmployeeUser } from '../types/types';

const useUserDetails = (
  email: string
): [EmployeeUser | null, string | null] => {
  const [userDetails, setUserDetails] = useState<EmployeeUser | null>(null);
  const [roles, setRoles] = useState<string | null>(null);

  const collection_ref = collection(db, 'users');
  const q = query(collection_ref, where('email', '==', email));

  useEffect(() => {
    const getUser = async () => {
      const docSnap = await getDocs(q);

      const users: EmployeeUser[] = [];

      docSnap.forEach((user) => {
        users.push({
          id: user.id,
          name: user.data().name,
          email: user.data().email,
          location: user.data().location,
          job_title: user.data().job_title,
          manager_name: user.data().manager_name,
          manager_email: user.data().manager_email,
          nationality: user.data().nationality,
          main_tech: user.data().main_tech,
          roles: user.data().roles,
          phone_number: user.data().phone_number,
          experience_level: user.data().experience_level
        });
      });

      setUserDetails(users[0]);
    };

    getUser();
  }, []);

  return [userDetails, roles];
};

export default useUserDetails;
