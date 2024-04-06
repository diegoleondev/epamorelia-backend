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

export const loginValidator = schemaHandler(loginSchema);
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

export const signupValidator = schemaHandler(signupSchema);
export type SignupBody = z.infer<typeof signupSchema>["body"];

const logoutSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: DETAILS.EMPTY,
      invalid_type_error: DETAILS.TYPE,
    }),
  }),
});

export const logoutValidator = schemaHandler(logoutSchema);
export type LogoutBody = z.infer<typeof logoutSchema>["body"];

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .email(DETAILS.FORMAT),
  }),
});
export const forgotPasswordValidator = schemaHandler(forgotPasswordSchema);
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>["body"];

const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: DETAILS.EMPTY,
      invalid_type_error: DETAILS.TYPE,
    }),
    password: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .min(6, DETAILS.SHORT)
      .max(100, DETAILS.LONG),
  }),
});
export const resetPasswordValidator = schemaHandler(resetPasswordSchema);
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>["body"];

const verifySchema = z.object({
  query: z.object({
    token: z.string({
      required_error: DETAILS.EMPTY,
      invalid_type_error: DETAILS.TYPE,
    }),
  }),
});
export const verifyValidator = schemaHandler(verifySchema);
export type VerifyQuery = z.infer<typeof verifySchema>["query"];
