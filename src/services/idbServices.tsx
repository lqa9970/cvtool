import { openDB } from 'idb';

const databaseName = 'Y3ZodWItZGV2';

const getDBVersion = async (name: string): Promise<number> => {
  const db = await openDB(name);
  return db.version;
};

export const getDataFromIDB = async (storeName: string) => {
  const version = await getDBVersion(databaseName);
  const db = await openDB(databaseName, version, {
    upgrade(db) {
      db.createObjectStore(storeName);
    }
  });
  try {
    const value = await db.getAll(storeName);
    return value;
  } catch (err) {
    return [];
  }
};

export const storeDataInIDB = async (storeName: string, data: any[]) => {
  let version = await getDBVersion(databaseName);
  const db = await openDB(databaseName, ++version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    }
  });
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  for (const item of data) {
    await store.put(item, item.id);
  }
  await tx.done;
};
