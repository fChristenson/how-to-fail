import { StatusError } from "./StatusError";

export class NotFoundError extends StatusError {
  constructor(message: string) {
    super(401, message);
  }
}
