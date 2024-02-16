import { ZodError, type AnyZodObject } from "zod";
import { ERRORS_TYPES } from "../constants/errors.js";

export type Details = Partial<Record<string, string>>;

export type Check = (value: any) => {
  success: boolean;
  details: Details;
};

export const error = (details: Details) =>
  ({
    success: false,
    details,
  }) as const;

export const success = () =>
  ({
    success: true,
    details: {} as unknown as Details,
  }) as const;

export const schemaHandler = (schema: AnyZodObject) => {
  const check: Check = (value) => {
    try {
      schema.parse(value);
      return success();
    } catch (err) {
      if (!(err instanceof ZodError)) return error({ _: ERRORS_TYPES.UNKNOWN });

      const parsed = err.issues.reduce<Details>(
        (acc, { path, message }) => ({
          ...acc,
          [path[1]]: message,
        }),
        {},
      );

      return error(parsed);
    }
  };

  return check;
};
