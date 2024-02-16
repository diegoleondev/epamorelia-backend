import { ZodError, type AnyZodObject } from "zod";
import { DETAILS } from "../constants/index.js";

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
      if (!(err instanceof ZodError)) return error({ _: DETAILS.UNKNOWN });

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
