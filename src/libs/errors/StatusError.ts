export enum ErrorType {
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
}

export class StatusError extends Error {
  status: number;
  type?: ErrorType;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
