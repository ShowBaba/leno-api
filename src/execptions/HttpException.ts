import { ErrorInterface } from '../interfaces/error.interface'

class HttpException extends Error {
  public status: number;
  public message: string;
  public errors?: Array<ErrorInterface>;

  constructor(status: number, message: string, errors?: Array<ErrorInterface>) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpException;
