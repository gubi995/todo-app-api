import CustomError from './custom-error';

class WrongCredentialsError extends CustomError {
  constructor() {
    super(400, 'Invalid email or password');
  }
}

export default WrongCredentialsError;
