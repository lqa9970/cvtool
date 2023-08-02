import { useState, useEffect, useContext } from "react";
import {
  query,
  collection,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { ActivityContext } from "../context/ActivityContext";
import { database } from "../services/firestoreService";
import {
  Certification,
  Education,
  EmployeeUser,
  IActivity,
  LanguagesWithProficiency,
  ProjectHistory,
  Role,
  SocialLinks,
  UserTechSkill,
} from "../types/types";

const useUserByEmail = (
  email: string
): [EmployeeUser | null, string | null] => {
  const [userDetails, setUserDetails] = useState<EmployeeUser | null>(null);
  const [roles, _setRoles] = useState<string | null>(null);
  const { setActivities } = useContext(ActivityContext);

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
            certifications: user.data().certifications as Certification[],
            projects: user.data().projects as ProjectHistory[],
            tech_skills: user.data().tech_skills as UserTechSkill[],
            last_cv_update: user.data().last_cv_update as Timestamp,
            activity: user.data().activity as IActivity[],
          });
        });
        setUserDetails(users[0]);
        if (users[0].activity) {
          setActivities(users[0].activity);
        }
      }
    };

    getUser().catch(() => {});
  }, [email]);

  return [userDetails, roles];
};

export default useUserByEmail;
