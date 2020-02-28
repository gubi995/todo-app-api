import express from 'express';

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todos';

const router = express.Router();

router
  .route('/')
  .get(getTodos)
  .post(createTodo);

router
  .route('/:id')
  .get(getTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export { router as todosRouter };
