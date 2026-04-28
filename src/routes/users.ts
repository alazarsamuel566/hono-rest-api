import { Hono } from 'hono';
import { userService } from '../services/user.service';

export const userRoutes = new Hono();

userRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const user = await userService.createUser({
    name: body.name,
    email: body.email,
  });
  return c.json(user, 201);
});

userRoutes.get('/', async (c) => {
  const users = await userService.getAllUsers();
  return c.json(users);
});

userRoutes.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const user = await userService.getUserById(id);
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }
  return c.json(user);
});