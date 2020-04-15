import { StatusError } from "./StatusError";

export class TokenError extends StatusError {
  constructor(status: number, message: string) {
    const token = Math.floor(Math.random() * 10000);
    super(status, `${message} code: ${token}`);
  }
}
