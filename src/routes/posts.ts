import { Hono } from 'hono';
import { postService } from '../services/post.service';

export const postRoutes = new Hono();

postRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const post = await postService.createPost({
    title: body.title,
    content: body.content,
    userId: body.userId,
  });
  return c.json(post, 201);
});

postRoutes.get('/', async (c) => {
  const posts = await postService.getAllPosts();
  return c.json(posts);
});

postRoutes.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const post = await postService.getPostById(id);
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  return c.json(post);
});

postRoutes.get('/user/:userId', async (c) => {
  const userId = parseInt(c.req.param('userId'));
  const posts = await postService.getPostsByUserId(userId);
  return c.json(posts);
});