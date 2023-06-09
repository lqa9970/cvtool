import { useState, useEffect } from 'react';
import { db } from '../services/firestoreService';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { EmployeeUser } from '../types/types';


type Filter = {
  skills: string[];
  languages: string[];
  nationality: string[];
  location: string[];
};

const useFilter = (filters: Filter) => {
  const [users, setUsers] = useState<EmployeeUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<EmployeeUser[]>([]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const fetchedUsers: EmployeeUser[] = usersSnapshot.docs.map(
        (doc: DocumentData) => {
          const data = doc.data() as EmployeeUser;
          return { ...data, id: doc.id };
        }
      );
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  // Filter users
  useEffect(() => {
    let result = [...users];

    if (filters.skills.length > 0) {
      result = result.filter(user => 
        user.skills?.some(skill => filters.skills.includes(skill.name))
      );
    }

    if (filters.languages.length > 0) {
      result = result.filter(user =>
        user.languages?.some(language => filters.languages.includes(language.name))
      );
    }

    if (filters.nationality.length > 0) {
      result = result.filter(user =>
        filters.nationality.includes(user.nationality)
      );
    }

    if (filters.location.length > 0) {
      result = result.filter(user =>
        filters.location.includes(user.location)
      );
    }

    setFilteredUsers(result);
  }, [users, filters]);

  return filteredUsers;
};

export default useFilter;
