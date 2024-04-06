import { z } from "zod";
import { DETAILS } from "../constants/index.js";
import { schemaHandler } from "./handler.js";

const getSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .uuid(DETAILS.FORMAT),
  }),
});

export const getUserInvitationValidator = schemaHandler(getSchema);
export type GetInvitationUsernameParams = z.infer<typeof getSchema>["params"];

const findAllSchema = z.object({
  query: z.object({
    branchId: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .uuid(DETAILS.FORMAT),
  }),
});
export const getAllUserInvitationsValidator = schemaHandler(findAllSchema);
export type getAllUserInvitationsQuery = z.infer<typeof findAllSchema>["query"];

const createSchema = z.object({
  body: z.object({
    branchId: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .uuid(DETAILS.FORMAT),
    roleId: z.enum(["ADMIN", "COORDINATOR", "STAFF", "USER"]),
    reference: z.string().optional(),
  }),
});

export const createUserInvitationValidator = schemaHandler(createSchema);
export type CreateUserInvitationBody = z.infer<typeof createSchema>["body"];
