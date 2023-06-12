import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db as database } from "../services/firestoreService";
import { getDataFromIDB, storeDataInIDB } from "../services/idbServices";

type UseFirestoreCollectionOptions = {
  collection: string;
  filter?: { field: string; value: unknown };
};

const useFilterCollectionData = (options: UseFirestoreCollectionOptions) => {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        let firestoreQuery;
        let documents;

        if (options.filter) {
          // Always fetch from Firestore when a filter is applied
          firestoreQuery = query(
            collection(database, options.collection),
            where(options.filter.field, "==", options.filter.value)
          );
          const querySnapshot = await getDocs(firestoreQuery);
          documents = querySnapshot.docs.map((document_) => ({
            id: document_.id,
            ...document_.data(),
          }));
        } else {
          // Use the cache when no filter is applied
          const cachedData = await getDataFromIDB(options.collection);

          if (cachedData.length > 0) {
            documents = cachedData;
          } else {
            firestoreQuery = collection(database, options.collection);
            const querySnapshot = await getDocs(firestoreQuery);
            documents = querySnapshot.docs.map((document_) => ({
              id: document_.id,
              ...document_.data(),
            }));
            await storeDataInIDB(options.collection, documents);
          }
        }

        if (isMounted) {
          setData(documents);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [options.collection, options.filter?.field, options.filter?.value]);

  return { data, loading, error };
};

export default useFilterCollectionData;
