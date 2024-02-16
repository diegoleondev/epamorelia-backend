import type { GetInvitationUsernameQuery } from "validators/invitations.js";

import { NotFoundError } from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import requestErrorHandler from "../utils/requestErrorHandler.js";

import { DETAILS } from "../constants/index.js";
import * as UserInvitations from "../models/user-invitation.js";

export const getInvitationUsername = requestErrorHandler<
  unknown,
  unknown,
  unknown,
  GetInvitationUsernameQuery
>(async (req, res) => {
  const { id } = req.query;

  const username = await UserInvitations.getSourceUsername({ id });

  if (username === null) {
    throw new NotFoundError({ id: DETAILS.INVALID });
  }

  response.success(res, { username });
});

export const postInvitation = requestErrorHandler(async (req, res) => {
  const { userId } = req;

  const invitation = await UserInvitations.create({ sourceId: userId });

  response.success(res, { invitation });
});
