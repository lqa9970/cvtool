import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db as database } from '../services/firestoreService';
import { Languages } from '../types/types';

const useGetLanguages = () => {
  const [languages, setLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const temporaryLanguages: Languages[] = [];
      const languagesRef = collection(database, '/languages');

      try {
        const languagesSnapshot = await getDocs(languagesRef);
        languagesSnapshot.forEach((language) => {
          setLanguages(temporaryLanguages);
          temporaryLanguages.push({
            id: language.id,
            name: language.data().name,
            nativeName: language.data().nativeName,
            prefix: language.data().prefix
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    getLanguages();
  }, []);

  return languages;
};

export default useGetLanguages;
