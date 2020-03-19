import CustomError from './custom-error';

class InvalidRefreshTokenError extends CustomError {
  constructor() {
    super(400, 'Invalid refresh token');
  }
}

export default InvalidRefreshTokenError;
