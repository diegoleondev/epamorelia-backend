import type { Details } from "validators/handler.js";

export class ModelError<T extends Details> extends Error {
  public details: Details;

  constructor(details: T) {
    super("ModelError");
    this.details = details;
  }

  public addDetails(details: Details) {
    this.details = {
      ...this.details,
      ...details,
    };
  }
}

export const modelErrorHandlerForResponse = async <T>(
  promise: Promise<T>,
  callbackError: (details: Details) => Error,
) => {
  return await promise.catch((e) => {
    if (e instanceof ModelError) {
      throw callbackError(e.details);
    }
    throw e;
  });
};
