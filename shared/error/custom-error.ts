class CustomError extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || 'Internal server error.';
  }
}

export default CustomError;
