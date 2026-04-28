import { db } from '../db';
import { posts, type NewPost, type Post } from '../db/schema';
import { eq } from 'drizzle-orm';

export const postService = {
  async createPost(data: NewPost): Promise<Post> {
    const [post] = await db.insert(posts).values(data).returning();
    return post;
  },

  async getPostById(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  },

  async getAllPosts(): Promise<Post[]> {
    return db.select().from(posts);
  },

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return db.select().from(posts).where(eq(posts.userId, userId));
  },
};