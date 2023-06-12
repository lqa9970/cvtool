import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db as database } from "../services/firestoreService";
import { getDataFromIDB, storeDataInIDB } from "../services/idbServices";

type UseFirestoreCollectionOptions = {
  collection: string;
};

const useGetFirestoreCollection = (options: UseFirestoreCollectionOptions) => {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const cachedData = await getDataFromIDB(options.collection);

        if (cachedData.length > 0) {
          if (isMounted) {
            setData(cachedData);
            setLoading(false);
          }
        } else {
          const querySnapshot = await getDocs(
            collection(database, options.collection)
          );
          const documents = querySnapshot.docs.map((document_) => ({
            id: document_.id,
            ...document_.data(),
          }));

          if (isMounted) {
            setData(documents);
            setLoading(false);
          }

          await storeDataInIDB(options.collection, documents);
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
  }, [options.collection]);

  return { data, loading, error };
};

export default useGetFirestoreCollection;
