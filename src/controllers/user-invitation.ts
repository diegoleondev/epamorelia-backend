import { ROLES } from "../constants/index.js";
import { UnauthorizedError } from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import {
  createUserInvitationModel,
  findAllUserInvitationsModel,
  findByPkUserInvitationModel,
} from "../models/user-invitation.js";
import requestErrorHandler from "../utils/error-handler-request.js";
import type {
  CreateUserInvitationBody,
  getAllUserInvitationsQuery,
  GetInvitationUsernameParams,
} from "../validators/user-invitations.js";

export const getUserInvitationController = requestErrorHandler<
  GetInvitationUsernameParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { id } = req.params;

  const userInvitationResult = await findByPkUserInvitationModel({ id });
  if (userInvitationResult?.branchId !== req.user.branchId) {
    if (req.user.role < ROLES.ADMIN) throw new UnauthorizedError();
  }

  response.success(res, userInvitationResult);
});

export const getAllUserInvitationsController = requestErrorHandler<
  unknown,
  unknown,
  unknown,
  getAllUserInvitationsQuery
>(async (req, res) => {
  const { query } = req;

  if (query.branchId !== req.user.branchId) {
    if (req.user.role < ROLES.ADMIN) throw new UnauthorizedError();
  }

  const result = await findAllUserInvitationsModel({ where: query });

  return response.success(res, result.data);
});

export const createUserInvitationController = requestErrorHandler<
  unknown,
  unknown,
  CreateUserInvitationBody,
  unknown
>(async (req, res) => {
  const { user, body } = req;

  if (user.role < ROLES.STAFF) throw new UnauthorizedError();

  if (user.branchId !== body.branchId) {
    if (user.role < ROLES.ADMIN) throw new UnauthorizedError();
  }

  if (user.role <= ROLES[body.roleId]) {
    throw new UnauthorizedError();
  }

  const userInvitationId = await createUserInvitationModel({
    sourceUserId: user.id,
    ...body,
  });

  return response.success(res, { id: userInvitationId });
});
