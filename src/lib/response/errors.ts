import { STATUS_CODE } from "../../constants/index.js";
import { type Details } from "../../validators/handler.js";

export interface ResponseErrorProps {
  statusCode?: number;
  details?: Details;
}

export class ResponseError extends Error {
  details?: Details | undefined;
  statusCode: number;
  constructor(props: ResponseErrorProps) {
    super("ResponseError");
    this.statusCode = props.statusCode ?? STATUS_CODE.UNKNOWN_ERROR;
    this.details = props.details ?? {};
  }
}

export class BadRequestError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: STATUS_CODE.BAD_REQUEST, details });
  }
}

export class UnauthorizedError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: STATUS_CODE.UNAUTHORIZED, details });
  }
}

export class NotFoundError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: STATUS_CODE.NOT_FOUND, details });
  }
}

export class InternalServerError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: STATUS_CODE.UNKNOWN_ERROR, details });
  }
}
