import { Hono } from 'hono';
import { commentService } from '../services/comment.service';

export const commentRoutes = new Hono();

commentRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const comment = await commentService.createComment({
    text: body.text,
    postId: body.postId,
  });
  return c.json(comment, 201);
});

commentRoutes.get('/', async (c) => {
  const comments = await commentService.getAllComments();
  return c.json(comments);
});

commentRoutes.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const comment = await commentService.getCommentById(id);
  if (!comment) {
    return c.json({ error: 'Comment not found' }, 404);
  }
  return c.json(comment);
});

commentRoutes.get('/post/:postId', async (c) => {
  const postId = parseInt(c.req.param('postId'));
  const comments = await commentService.getCommentsByPostId(postId);
  return c.json(comments);
});