import { Request, Response, NextFunction } from 'express';

import { Todo } from '../models';
import { responseErrorHandler, todoNotFoundError } from '../shared';

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({ data: todos });
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
      return todoNotFoundError(res, todoId);
    }

    return res.status(200).json({ data: todo });
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.create(req.body);

    return res.status(200).json({ data: todos });
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id;
    const updateInformation = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId, updateInformation, { new: true, runValidators: true });

    if (!todo) {
      return todoNotFoundError(res, todoId);
    }

    return res.status(200).json({ data: todo });
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findOneAndDelete({ _id: todoId });

    if (!todo) {
      return todoNotFoundError(res, todoId);
    }

    return res.status(204).send();
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};
