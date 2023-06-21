import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../services/firestoreService";
import { Skills } from "../types/types";

const useGetSkills = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  useEffect(() => {
    const getSkills = async () => {
      const temporarySkills: Skills[] = [];
      const skillsRef = collection(database, "/skills");

      try {
        const skillsSnapshot = await getDocs(skillsRef);
        skillsSnapshot.forEach((skill) => {
          temporarySkills.push({
            id: skill.id,
            name: skill.data().name as string,
          });
        });
        setSkills(temporarySkills);
      } catch (error) {
        console.error(error);
      }
    };

    getSkills()
      .then(() => null)
      .catch(() => null);
  }, []);

  return skills;
};

export default useGetSkills;
