import { useState, useEffect } from 'react';
import { db } from '../services/firestoreService';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { EmployeeUser, Filters } from '../types/types';

const useFilter = (filters: Filters) => {
  const [users, setUsers] = useState<EmployeeUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<EmployeeUser[]>([]);

  // Fetch all users
  useEffect(() => {
    (async () => {
      const usersCollection = collection(db, 'test_users');
      const usersSnapshot = await getDocs(usersCollection);
      const fetchedUsers: EmployeeUser[] = usersSnapshot.docs.map(
        (doc: DocumentData) => {
          const data = doc.data() as EmployeeUser;
          return { ...data, id: doc.id };
        }
      );
      setUsers(fetchedUsers);
    })();
  }, []);

  // Filter users
  useEffect(() => {
    let result = [...users];

     result = result.filter(user =>
      (filters.hyperscaler.length === 0 || filters.hyperscaler.includes(user.main_tech!)) &&
      (filters.mainTech.length === 0 || filters.mainTech.includes(user.main_tech!)) &&
      (filters.skills.length === 0 || user.skills?.some(skill => filters.skills.includes(skill.name))) &&
      (filters.certificate.length === 0 || user.certifications?.some(certificate => filters.certificate.includes(certificate.name))) &&
      (filters.languages.length === 0 || user.languages?.some(language => filters.languages.includes(language.name))) &&
      (filters.nationality.length === 0 || filters.nationality.includes(user.nationality!)) &&
      (filters.location.length === 0 || filters.location.includes(user.location!))
    );
  
    setFilteredUsers(result);

  }, [users, filters]);
  return filteredUsers;
};

export default useFilter;
