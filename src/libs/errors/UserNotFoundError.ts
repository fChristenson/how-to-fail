import { NotFoundError } from "./NotFoundError";

export class UserNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Could not find user with id ${id}`);
  }
}
