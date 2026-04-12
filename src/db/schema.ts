import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const memories = sqliteTable('memories', {
  // Unique ID for every memory
  id: integer('id').primaryKey({ autoIncrement: true }),
  
  // What kind of memory is this? (e.g., 'code_preference', 'health', 'project_status')
  category: text('category').notNull(),
  
  // The actual fact (e.g., 'User runs 5 miles a day', 'Must use React Native CLI')
  fact: text('fact').notNull(),
  
  // Automatically saves the exact time the AI learned this fact
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
});