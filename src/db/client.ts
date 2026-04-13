import { open } from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';
import * as schema from './schema';

// Open the native database
const opsqlite = open({ name: 'my_app_db.sqlite' });

// Initialize Drizzle
export const db = drizzle(opsqlite, { schema });


export const allMemoryFromDB = async () => {
    try {
        const allMemories = await db.select().from(schema.chatHistory).all();
        console.log("Current Memories in DB:", allMemories);
        return allMemories;
    } catch (error) {
        console.error("Database connection failed:", error);
        return [];
    }
}

export const addDemoData = async () => {
    try {
        const newMemory = {
            role: 'code_preference',
            content: 'User prefers React Native CLI over Expo',
        };
        const result = await db.insert(schema.chatHistory).values(newMemory).run();
        console.log("Inserted new memory with ID:", result);
        return result;
    } catch (error) {
        console.error("Failed to insert demo data:", error);
        return null;
    }
}

export const clearMemory = async () => {
    try {
        await db.delete(schema.chatHistory).run();
        console.log("All memories cleared.");
    } catch (error) {
        console.error("Failed to clear memories:", error);
    }
}

export const addMemoryToDB = async (role: string, content: string) => {
    try {
        const newMemory = { role, content };
        const result = await db.insert(schema.chatHistory).values(newMemory).run();
        console.log("Inserted new memory with ID:", result);
    } catch (error) {
        console.error("Failed to insert memory:", error);
    }
}