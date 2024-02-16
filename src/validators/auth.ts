import { z } from "zod";
import { ERRORS_TYPES } from "../constants/errors.js";
import { schemaHandler } from "./handler.js";

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .email(ERRORS_TYPES.FORMAT),
    password: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .min(6, ERRORS_TYPES.SHORT)
      .max(100, ERRORS_TYPES.LONG),
  }),
});

export const login = schemaHandler(loginSchema);
export type LoginBody = z.infer<typeof loginSchema>["body"];

const signupSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .email(ERRORS_TYPES.FORMAT),
    password: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .min(6, ERRORS_TYPES.SHORT)
      .max(100, ERRORS_TYPES.LONG),
    username: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .min(3, ERRORS_TYPES.SHORT)
      .max(25, ERRORS_TYPES.LONG),
    invitation: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .uuid(ERRORS_TYPES.FORMAT),
  }),
});

export const signup = schemaHandler(signupSchema);
export type SignupBody = z.infer<typeof signupSchema>["body"];

const logoutSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: ERRORS_TYPES.EMPTY,
      invalid_type_error: ERRORS_TYPES.TYPE,
    }),
  }),
});

export const logout = schemaHandler(logoutSchema);
export type LogoutBody = z.infer<typeof logoutSchema>["body"];
