import CustomError from './custom-error';

class TodoNotFoundError extends CustomError {
  constructor(todoId: string) {
    super(404, `Todo not found with the following id: ${todoId}`);
  }
}

export default TodoNotFoundError;
