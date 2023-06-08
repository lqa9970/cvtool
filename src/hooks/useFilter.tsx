import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firestoreService';

type User = {
  id: string,
  name: string,
  email: string,
  location: string,
  job_title: string,
  manager_name: string,
  manager_email: string,
  nationality: string,
  main_tech: string,
  hyperscaler: string[],    
  languages: string[],
  skills: string[],
};

type Filter = {
  skills?: string[];
  languages?: string[];
  nationality?: string[];
  location?: string[];
  hyperscaler?: string[];
  main_tech?: string[];
};

const initialFilter: Filter = {};

const useFirestoreFilter = () => {
  const [data, setData] = useState<User[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  // Fetch data from Firestore for the first time
  useEffect(() => {
    const fetchData = async () => {
      const keys = Object.keys(filter).filter((key) => filter[key as keyof Filter]?.length);
      let firestoreQuery : any = collection(db, 'users');
      if (keys.length > 0) {
        const conditions = keys.map((key) => where(key, 'array-contains-any', filter[key as keyof Filter]));
        firestoreQuery = query(firestoreQuery, ...conditions);
      }
      const querySnapshot = await getDocs(firestoreQuery);
      const fetchedData = querySnapshot.docs.map((doc) => doc.data() as User);
      setData(fetchedData);
      setFilteredData(fetchedData);
    };
    fetchData();
  }, []);

  // Filter data in frontend for subsequent filter changes
  useEffect(() => {
    const newFilteredData = data.filter((item) =>
      Object.keys(filter).every((key) =>
        filter[key as keyof Filter]?.length ? filter[key as keyof Filter]?.some(f => item[key as keyof User]?.includes(f)) : true
      )
    );
    setFilteredData(newFilteredData);
  }, [filter]);

  return {
    data: filteredData,
    setFilter,
  };
};

export default useFirestoreFilter;
