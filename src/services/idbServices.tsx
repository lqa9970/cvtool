import { openDB } from 'idb';

export const getDataFromIDB = async (storeName: string) => {
  const db = await openDB('Y3ZodWItZGV2', 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    }
  });
  return await db.getAll(storeName);
};

export const storeDataInIDB = async (storeName: string, data: any[]) => {
  const db = await openDB('Y3ZodWItZGV2', 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
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
