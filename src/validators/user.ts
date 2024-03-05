import DETAILS from "constants/details.js";
import { z } from "zod";
import { branchId } from "./branch.js";
import { schemaHandler } from "./handler.js";

const findOneUserSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: DETAILS.EMPTY,
      invalid_type_error: DETAILS.TYPE,
    }),
  }),
});
export const getUserValidator = schemaHandler(findOneUserSchema);
export type GetUserParams = z.infer<typeof findOneUserSchema>["params"];

const getAllUsersSchema = z.object({
  query: z
    .object({
      branchId: branchId.optional(),
    })
    .optional(),
});

export const getAllUsersValidator = schemaHandler(getAllUsersSchema);
export type GetAllUsersQuery = z.infer<typeof getAllUsersSchema>["query"];
