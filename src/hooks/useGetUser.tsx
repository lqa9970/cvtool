import { useState, useEffect } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { database } from "../services/firestoreService";
import {
  Certifications,
  Education,
  EmployeeUser,
  LanguagesWithProficiency,
  ProjectHistory,
  Role,
  Skill,
  Skills,
  SocialLinks,
} from "../types/types";

const useUserDetails = (
  email: string
): [EmployeeUser | null, string | null] => {
  const [userDetails, setUserDetails] = useState<EmployeeUser | null>(null);
  const [roles, _setRoles] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (email) {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, where("email", "==", email));

        const documentSnap = await getDocs(q);

        const users: EmployeeUser[] = [];

        documentSnap.forEach((user) => {
          users.push({
            id: user.id,
            name: user.data().name as string,
            email: user.data().email as string,
            location: user.data().location as string,
            job_title: user.data().job_title as string,
            manager_name: user.data().manager_name as string,
            manager_email: user.data().manager_email as string,
            nationality: user.data().nationality as string,
            main_tech: user.data().main_tech as string,
            roles: user.data().roles as Role[],
            phone_number: user.data().phone_number as string,
            experience_level: user.data().experience_level as string,
            social_links: user.data().social_links as SocialLinks,
            education: user.data().education as Education[],
            bio: user.data().bio as string,
            languages: user.data().languages as LanguagesWithProficiency[],
            certifications: user.data().certifications as Certifications[],
            projects: user.data().projects as ProjectHistory[],
            skills: user.data().skills as Skill[],
          });
        });
        setUserDetails(users[0]);
      }
    };

    getUser().catch(() => {});
  }, [email]);

  return [userDetails, roles];
};

export default useUserDetails;
