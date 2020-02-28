import { Request, Response, NextFunction } from 'express';

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  res.send('Get todo');
};

export const getTodo = (req: Request, res: Response, next: NextFunction) => {
  res.send('Get todo');
};

export const createTodo = (req: Request, res: Response, next: NextFunction) => {
  res.send('Create todo');
};

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  res.send('Update todo');
};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  res.send('Delete todo');
};
