import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firestoreService';
import { Languages } from '../types/types';

const useGetLanguages = () => {
  const [languages, setLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    const getLanguages = async () => {
      const tempLanguages: Languages[] = [];
      const languagesRef = collection(db, '/languages');

      try {
        const languagesSnapshot = await getDocs(languagesRef);
        languagesSnapshot.forEach((language) => {
          setLanguages(tempLanguages);
          tempLanguages.push({
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
