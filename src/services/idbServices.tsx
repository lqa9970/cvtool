import { openDB } from "idb";

const databaseName = "Y3ZodWItZGV2";

const getDBVersion = async (name: string): Promise<number> => {
  const database = await openDB(name);
  return database.version;
};

export const getDataFromIDB = async (storeName: string) => {
  const version = await getDBVersion(databaseName);
  const database = await openDB(databaseName, version, {
    upgrade(database_) {
      database_.createObjectStore(storeName);
    },
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await database.getAll(storeName);
  } catch {
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storeDataInIDB = async (storeName: string, data: any[]) => {
  let version = await getDBVersion(databaseName);
  // eslint-disable-next-line no-plusplus
  const database = await openDB(databaseName, ++version, {
    upgrade(database_) {
      if (!database_.objectStoreNames.contains(storeName)) {
        database_.createObjectStore(storeName);
      }
    },
  });
  const tx = database.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.clear();
  for (const item of data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await store.put(item, item.id);
  }
  await tx.done;
};
