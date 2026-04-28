import { db } from '../db';
import { comments, type NewComment, type Comment } from '../db/schema';
import { eq } from 'drizzle-orm';

export const commentService = {
  async createComment(data: NewComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
  },

  async getCommentById(id: number): Promise<Comment | undefined> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment;
  },

  async getAllComments(): Promise<Comment[]> {
    return db.select().from(comments);
  },

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return db.select().from(comments).where(eq(comments.postId, postId));
  },
};