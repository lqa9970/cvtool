import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../services/firestoreService";
import { EmployeeUser, Filters } from "../types/types";

const useFilter = (filters: Filters) => {
  const [users, setUsers] = useState<EmployeeUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<EmployeeUser[]>([]);

  // Fetch all users
  useEffect(() => {
    (async () => {
      const usersCollection = collection(database, "test_users");
      const usersSnapshot = await getDocs(usersCollection);
      const fetchedUsers: EmployeeUser[] = usersSnapshot.docs.map(
        (document) => {
          const data = document.data() as EmployeeUser;
          return { ...data, id: document.id };
        }
      );
      setUsers(fetchedUsers);
    })().catch(() => {});
  }, []);

  // Filter users
  useEffect(() => {
    let result = [...users];

    result = result.filter(
      (user) =>
        (filters.hyperscaler.length === 0 ||
          filters.hyperscaler.includes(user.main_tech ?? "")) &&
        (filters.mainTech.length === 0 ||
          filters.mainTech.includes(user.main_tech ?? "")) &&
        filters.skills.every((filter) =>
          user.skills?.some((skill) => skill.name === filter)
        ) &&
        filters.certificate.every((filter) =>
          user.certifications?.some(
            (certificate) => certificate.name === filter
          )
        ) &&
        filters.languages.every((filter) =>
          user.languages?.some((lang) => lang.name === filter)
        ) &&
        (filters.nationality.length === 0 ||
          filters.nationality.includes(user.nationality ?? "")) &&
        (filters.location.length === 0 ||
          filters.location.includes(user.location ?? ""))
    );

    setFilteredUsers(result);
  }, [users, filters]);
  return filteredUsers;
};

export default useFilter;
