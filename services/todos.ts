/* eslint-disable */

import { Todo } from '../models';
import { ITodo } from '../models/Todo';
import { TodoNotFoundError } from '../shared/error';

class TodoService {
  static async getTodos(): Promise<ITodo[]> {
    const todos = await Todo.find();
    const todosForClient = todos.map((todo) => todo.toObject());

    return todosForClient;
  }

  static async getTodo(id: string): Promise<ITodo> {
    const todo = await Todo.findOne({ _id: id });

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    return todo;
  }

  static async createTodo(todo: ITodo): Promise<ITodo> {
    return await Todo.create(todo);
  }

  static async updateTodo(id: string, updatedFields: any): Promise<ITodo> {
    const todo = await Todo.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    return todo;
  }

  static async deleteTodo(id: string): Promise<void> {
    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    return;
  }
}

export default TodoService;
