import { useState, useEffect } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db as database } from "../services/firestoreService";
import { EmployeeUser } from "../types/types";

const useUserDetails = (
  email: string
): [EmployeeUser | null, string | null] => {
  const [userDetails, setUserDetails] = useState<EmployeeUser | null>(null);
  const [roles, setRoles] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (email) {
        const collection_ref = collection(database, "users");
        const q = query(collection_ref, where("email", "==", email));

        const documentSnap = await getDocs(q);

        const users: EmployeeUser[] = [];

        documentSnap.forEach((user) => {
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
            experience_level: user.data().experience_level,
            social_links: user.data().social_links,
            education: user.data().education,
            bio: user.data().bio,
            languages: user.data().languages,
            certifications: user.data().certifications,
            projects: user.data().projects,
            skills: user.data().skills,
          });
        });
        setUserDetails(users[0]);
      }
    };

    getUser();
  }, [email]);

  return [userDetails, roles];
};

export default useUserDetails;
