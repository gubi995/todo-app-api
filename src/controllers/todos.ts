import { Request, Response, NextFunction } from 'express';

import { TodoService, AuthService } from '../services';
import { getAccessToken } from '../utils/auth';

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoService.getTodos();

    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

export const getMyTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = getAccessToken(req);
    const { email } = AuthService.decodeAccessToken(accessToken);

    const todos = await TodoService.getTodos({ 'assignee.email': email });

    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.getTodo(req.params.id);

    return res.status(200).json(todo.toObject());
  } catch (err) {
    return next(err);
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.createTodo(req.body);

    return res.status(200).json(todo.toObject());
  } catch (err) {
    return next(err);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await TodoService.updateTodo(req.params.id, req.body);

    return res.status(200).json(todo.toObject());
  } catch (err) {
    return next(err);
  }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TodoService.deleteTodo(req.params.id);

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
