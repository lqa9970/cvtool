import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../services/firestoreService";

const useGetCollectionWithFields = (
  collectionName: string,
  fields: string[]
) => {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const querySnapshot = await getDocs(
          collection(database, collectionName)
        );
        const documents = querySnapshot.docs.map((document_) => {
          const documentData = document_.data();

          const selectedFields: { [key: string]: unknown } = {};

          fields.forEach((field) => {
            if (Object.hasOwn(documentData, field)) {
              selectedFields[field] = documentData[field];
            }
          });

          return {
            id: document_.id,
            ...selectedFields,
          };
        });

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
    })().catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [collectionName]);
  return { data, loading, error };
};
export default useGetCollectionWithFields;
