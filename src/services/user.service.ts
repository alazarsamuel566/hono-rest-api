import { db } from '../db';
import { users, type NewUser, type User } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userService = {
  async createUser(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },
};