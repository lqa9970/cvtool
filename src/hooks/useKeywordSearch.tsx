import { useState, useEffect } from 'react';
import { database } from '../services/firestoreService';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { EmployeeUser } from '../types/types';

function useKeywordSearch(keyword: string): EmployeeUser[] {
  const [filteredProfiles, setFilteredProfiles] = useState<EmployeeUser[]>([]);
  const [profiles, setProfiles] = useState<EmployeeUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(database, 'test_users');
      const usersSnapshot = await getDocs(usersCollection);
      const fetchedUsers: EmployeeUser[] = usersSnapshot.docs.map(
        (doc: DocumentData) => {
          const data = doc.data() as EmployeeUser;
          return { ...data, id: doc.id };
        }
      );
      setProfiles(fetchedUsers);
    };
    if (keyword.length >= 3) {
      fetchUsers();
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword === '' || keyword.length < 3) {
      setFilteredProfiles([]);
    } else {
      const lowerCasedKeyword = keyword.toLowerCase();
      const result = profiles.filter(
        (profile) =>
          (profile.name && profile.name.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.bio && profile.bio.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.email && profile.email.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.experience_level && profile.experience_level.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.job_title && profile.job_title.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.location && profile.location.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.manager_email && profile.manager_email.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.manager_name && profile.manager_name.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.nationality && profile.nationality.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.phone_number && profile.phone_number.includes(lowerCasedKeyword)) ||
          (profile.main_tech && profile.main_tech.toLowerCase().includes(lowerCasedKeyword)) ||
          (profile.education && profile.education.some((edu) =>
            edu.school && edu.school.toLowerCase().includes(lowerCasedKeyword)
          )) ||
          (profile.languages && profile.languages.some((lang) =>
            lang.name && lang.name.toLowerCase().includes(lowerCasedKeyword)
          ))
      );
      setFilteredProfiles(result);
    }
  }, [profiles, keyword]);
  
  return filteredProfiles;
}

export default useKeywordSearch;
