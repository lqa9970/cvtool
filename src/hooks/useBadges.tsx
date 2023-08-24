import { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from "../services/firestoreService";

const storage = getStorage(app);

const useFirebaseImage = (filenames: string[]) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const urls = await Promise.all(
            filenames.map(async (filename) => {
              const imageRef = ref(storage, filename);
              return await getDownloadURL(imageRef);
            })
          );
          setImageUrls(urls);
        } catch (error) {
          console.error('Error fetching images', error);
        }
      };
  
      fetchImages();
    }, [filenames]);
  
    return imageUrls;
  };
  

export default useFirebaseImage;