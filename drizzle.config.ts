import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Make sure this matches where you saved Step 1
  dialect: 'sqlite',
  dbCredentials: {
    // This tells Drizzle to just create a brand new file right here on your PC
    url: 'file:./agent_memory.sqlite', 
  },
});