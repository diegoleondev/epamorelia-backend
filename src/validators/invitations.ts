import { z } from "zod";
import { DETAILS } from "../constants/index.js";
import { schemaHandler } from "./handler.js";

const getInvitationUsernameSchema = z.object({
  query: z.object({
    id: z
      .string({
        required_error: DETAILS.EMPTY,
        invalid_type_error: DETAILS.TYPE,
      })
      .uuid(DETAILS.FORMAT),
  }),
});

export const getInvitationUsername = schemaHandler(getInvitationUsernameSchema);
export type GetInvitationUsernameQuery = z.infer<
  typeof getInvitationUsernameSchema
>["query"];
