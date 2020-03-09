import { Router } from 'express';

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import authGuard from '../middlewares/auth-guard';

const router = Router();

router
  .route('/')
  .get(authGuard, getTodos)
  .post(authGuard, createTodo);

router
  .route('/:id')
  .get(authGuard, getTodo)
  .patch(authGuard, updateTodo)
  .delete(authGuard, deleteTodo);

export { router as todosRouter };
