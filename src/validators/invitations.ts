import { z } from "zod";
import { ERRORS_TYPES } from "../constants/errors.js";
import { schemaHandler } from "./handler.js";

const getInvitationUsernameSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: ERRORS_TYPES.EMPTY,
        invalid_type_error: ERRORS_TYPES.TYPE,
      })
      .uuid(ERRORS_TYPES.FORMAT),
  }),
});

export const getInvitationUsername = schemaHandler(getInvitationUsernameSchema);
export type GetInvitationUsernameQuery = z.infer<
  typeof getInvitationUsernameSchema
>["query"];
