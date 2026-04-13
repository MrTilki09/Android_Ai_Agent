// import {
//   IOS_LIBRARY_PATH, // Default iOS
//   IOS_DOCUMENT_PATH,
//   ANDROID_DATABASE_PATH, // Default Android
//   ANDROID_FILES_PATH,
//   ANDROID_EXTERNAL_FILES_PATH, // Android SD Card
//   open,
// } from '@op-engineering/op-sqlite';
// import { drizzle } from 'drizzle-orm/op-sqlite';
// import * as schema from './schema';


// // 1. Open the blazing fast OP-SQLite C++ connection
// // It will automatically look in your assets/www folder, copy the DB, and open it
// const opsqliteDb = open({ name: 'agent_memory.sqlite' });

// // 2. Wrap it with Drizzle so you get full TypeScript superpowers
// export const db = drizzle(opsqliteDb, { schema });

// // Quick test function to make sure it works
