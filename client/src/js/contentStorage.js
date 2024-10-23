import { openDB } from 'idb';

// Define constants for the database and store names
const DB_NAME = 'text_processor_db';
const STORE_NAME = 'content_store';

// Initialize the database
const initDb = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains(STORE_NAME)) {
        console.log('Content store already exists');
        return;
      }
      // If not, create a new object store
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('Content store created');
    },
  });
  return db;
};

// Function to store content in the database
export const storeContent = async (content) => {
  console.log('Storing content');
  const db = await initDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  // Store the content with id 1 (overwriting if it exists)
  await store.put({ id: 1, content });
  await tx.done;
  console.log('Content stored successfully');
};

// Function to retrieve content from the database
export const retrieveContent = async () => {
  console.log('Retrieving content');
  const db = await initDb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  // Retrieve the content with id 1
  const result = await store.get(1);
  await tx.done;
  // Return the content if it exists, otherwise undefined
  return result?.content;
};

// Initialize the database when the module is imported
initDb();