import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { userRoutes } from './routes/users';
import { postRoutes } from './routes/posts';
import { commentRoutes } from './routes/comments';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Welcome to the REST API' });
});

app.route('/users', userRoutes);
app.route('/posts', postRoutes);
app.route('/comments', commentRoutes);

console.log('Server starting on http://localhost:3000');

serve({
  fetch: app.fetch,
  port: 3000,
});