import { Todo, ITodo } from '../models';
import { TodoNotFoundError } from '../shared';

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

  static async createTodo(todoFields: ITodo): Promise<ITodo> {
    return Todo.create(todoFields);
  }

  static async updateTodo(id: string, todoFields: any): Promise<ITodo> {
    const todo = await Todo.findByIdAndUpdate(id, todoFields, { new: true, runValidators: true });

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
  }
}

export default TodoService;
