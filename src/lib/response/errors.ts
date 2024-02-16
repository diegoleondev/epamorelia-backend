import { ERRORS_HTTP } from "../../constants/errors.js";
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
    this.statusCode = props.statusCode ?? ERRORS_HTTP.UNKNOWN_ERROR;
    this.details = props.details ?? {};
  }
}

export class BadRequestError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: ERRORS_HTTP.BAD_REQUEST, details });
  }
}

export class UnauthorizedError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: ERRORS_HTTP.UNAUTHORIZED, details });
  }
}

export class NotFoundError extends ResponseError {
  constructor(details?: Details) {
    super({ statusCode: ERRORS_HTTP.NOT_FOUND, details });
  }
}
