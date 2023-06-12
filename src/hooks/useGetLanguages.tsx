import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../services/firestoreService";
import { Languages } from "../types/types";

const useGetLanguages = () => {
  const [languages, setLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const temporaryLanguages: Languages[] = [];
      const languagesRef = collection(database, "/languages");

      try {
        const languagesSnapshot = await getDocs(languagesRef);
        languagesSnapshot.forEach((language) => {
          setLanguages(temporaryLanguages);
          temporaryLanguages.push({
            id: language.id,
            name: language.data().name as string,
            nativeName: language.data().nativeName as string,
            prefix: language.data().prefix as string,
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    getLanguages()
      .then(() => null)
      .catch(() => null);
  }, []);

  return languages;
};

export default useGetLanguages;
