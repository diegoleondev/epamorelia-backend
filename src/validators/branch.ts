import { z } from "zod";
import { DETAILS } from "../constants/index.js";
import { schemaHandler } from "./handler.js";

// SCHEMAS
export const branchId = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .uuid(DETAILS.INVALID);
export const name = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(3, DETAILS.SHORT)
  .max(25, DETAILS.LONG);
export const limit = z
  .number({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .int()
  .min(1, DETAILS.MIN)
  .max(1000, DETAILS.MAX);

// VALIDATORS
const getBranchSchema = z.object({
  params: z.object({
    branchId,
  }),
});

export const getBranchValidator = schemaHandler(getBranchSchema);
export type GetBranchParams = z.infer<typeof getBranchSchema>["params"];

const getBranchUsersSchema = z.object({
  params: z.object({
    branchId,
  }),
});

export const getBranchUsersValidator = schemaHandler(getBranchUsersSchema);
export type GetBranchUsersParams = z.infer<
  typeof getBranchUsersSchema
>["params"];

const createBranchSchema = z.object({
  body: z.object({
    name,
    limit,
  }),
});

export const createBranchValidator = schemaHandler(createBranchSchema);
export type CreateBranchBody = z.infer<typeof createBranchSchema>["body"];

const updateBranchSchema = z.object({
  params: z.object({
    branchId,
  }),
  body: z.object({
    name: name.optional(),
    limit: limit.optional(),
  }),
});

export const updateBranchValidator = schemaHandler(updateBranchSchema);
export type UpdateBranchParams = z.infer<typeof updateBranchSchema>["params"];
export type UpdateBranchBody = z.infer<typeof updateBranchSchema>["body"];

const removeBranchSchema = z.object({
  params: z.object({
    branchId,
  }),
});

export const removeBranchValidator = schemaHandler(removeBranchSchema);
export type RemoveBranchParams = z.infer<typeof removeBranchSchema>["params"];
