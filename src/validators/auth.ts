import { z } from "zod";
import { DETAILS } from "../constants/index.js";
import { schemaHandler } from "./handler.js";

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .email(DETAILS.FORMAT),
    password: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .min(6, DETAILS.SHORT)
      .max(100, DETAILS.LONG),
  }),
});

export const login = schemaHandler(loginSchema);
export type LoginBody = z.infer<typeof loginSchema>["body"];

const signupSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .email(DETAILS.FORMAT),
    password: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .min(6, DETAILS.SHORT)
      .max(100, DETAILS.LONG),
    username: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .min(3, DETAILS.SHORT)
      .max(25, DETAILS.LONG),
    invitation: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .uuid(DETAILS.FORMAT),
  }),
});

export const signup = schemaHandler(signupSchema);
export type SignupBody = z.infer<typeof signupSchema>["body"];

const logoutSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: DETAILS.EMPTY,
      invalid_type_error: DETAILS.TYPE,
    }),
  }),
});

export const logout = schemaHandler(logoutSchema);
export type LogoutBody = z.infer<typeof logoutSchema>["body"];
