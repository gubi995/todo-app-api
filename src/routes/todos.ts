import { Router } from 'express';

import { getTodos, getMyTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { requestValidator, todoSchema } from '../validators';
import authGuard from '../middlewares/auth-guard';

const router = Router();

router
  .route('/')
  .get(authGuard, getTodos)
  .post(authGuard, requestValidator(todoSchema), createTodo);

router.route('/my').get(authGuard, getMyTodos);

router
  .route('/:id')
  .get(authGuard, getTodo)
  .put(authGuard, requestValidator(todoSchema), updateTodo)
  .delete(authGuard, deleteTodo);

export { router as todosRouter };
