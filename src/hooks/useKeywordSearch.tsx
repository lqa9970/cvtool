import { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { database } from "../services/firestoreService";
import { EmployeeUser } from "../types/types";

function useKeywordSearch(keyword: string): EmployeeUser[] {
  const [filteredProfiles, setFilteredProfiles] = useState<EmployeeUser[]>([]);
  const [profiles, setProfiles] = useState<EmployeeUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(database, "test_users");
      const usersSnapshot = await getDocs(usersCollection);
      const fetchedUsers: EmployeeUser[] = usersSnapshot.docs.map(
        (document: DocumentData) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const data = document.data() as EmployeeUser;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return { ...data, id: document.id };
        }
      );
      setProfiles(fetchedUsers);
    };
    if (keyword.length >= 3) {
      fetchUsers()
        .then(() => null)
        .catch(() => null);
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword === "" || keyword.length < 3) {
      setFilteredProfiles([]);
    } else {
      const lowerCasedKeyword = keyword.toLowerCase();
      const result = profiles.filter(
        (profile) =>
          profile.name?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.bio?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.email?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.experience_level?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.job_title?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.location?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.manager_email?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.manager_name?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.nationality?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.phone_number?.includes(lowerCasedKeyword) ||
          profile.main_tech?.toLowerCase().includes(lowerCasedKeyword) ||
          profile.education?.some((edu) =>
            edu.school.toLowerCase().includes(lowerCasedKeyword)
          ) ||
          profile.languages?.some((lang) =>
            lang.name.toLowerCase().includes(lowerCasedKeyword)
          )
      );
      setFilteredProfiles(result);
    }
  }, [profiles, keyword]);

  return filteredProfiles;
}

export default useKeywordSearch;
