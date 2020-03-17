import CustomError from './custom-error';

class EmailReservedError extends CustomError {
  constructor() {
    super(400, 'The provided email is already in use. Please choose another one.');
  }
}

export default EmailReservedError;
