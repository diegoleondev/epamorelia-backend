import type {
  ForgotPasswordBody,
  LoginBody,
  LogoutBody,
  ResetPasswordBody,
  SignupBody,
} from "../validators/auth.js";

import { DETAILS, ROLES } from "../constants/index.js";
import Email from "../lib/email/index.js";
import { BadRequestError, UnauthorizedError } from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import { compare } from "../utils/auth/encrypt.js";
import Token from "../utils/auth/token.js";
import requestErrorHandler from "../utils/error-handler-request.js";

import {
  findByPkUserInvitationModel,
  updateUserInvitationModel,
} from "../models/user-invitation.js";
import * as UserTokens from "../models/user-tokens.js";
import {
  createUserModel,
  destroyUserModel,
  findOneUserModel,
  updatePassword,
} from "../models/user.js";

export const signupController = requestErrorHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
>(async (req, res) => {
  const { email, invitation, password, username } = req.body;

  const userInvitation = await findByPkUserInvitationModel({ id: invitation });

  if (userInvitation === null || userInvitation.targetUserId !== null)
    throw new BadRequestError({ invitation: DETAILS.INVALID });

  const user = await createUserModel({
    username,
    email,
    password,
    branchId: userInvitation.branchId,
    roleId: userInvitation.roleId,
  });

  if (!user.success || user.data === null)
    throw new BadRequestError(user.details);

  const destroyUser = () => {
    destroyUserModel({ id: user.data?.id ?? "" }).catch(() => {
      /* TODO: Log Error */
    });
  };

  await updateUserInvitationModel({
    id: invitation,
    targetUserId: user.data.id,
  }).catch(() => {
    // TODO: Log this error
    destroyUser();
    throw new BadRequestError({ invitation: DETAILS.UNKNOWN });
  });

  const { token, expiresIn } = Token.createAuthUser({ userId: user.data.id });

  await UserTokens.create({
    token,
    userId: user.data.id,
    expiresIn,
  }).catch(() => {
    // TODO: Log this error
    destroyUser();
    throw new BadRequestError({ _: DETAILS.UNKNOWN });
  });

  response.success(res, {
    ...user.data,
    role: ROLES[user.data.roleId as "USER"] ?? 0,
    token,
    expiresIn,
    password: undefined,
  });
});

export const loginController = requestErrorHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
>(async (req, res) => {
  const { email, password } = req.body;

  const user = await findOneUserModel({ email });

  if (user.data === null) throw new UnauthorizedError();

  if (!(await compare(password, user.data.password)))
    throw new UnauthorizedError();

  const { token, expiresIn } = Token.createAuthUser({ userId: user.data.id });

  await UserTokens.create({
    token,
    userId: user.data.id,
    expiresIn,
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: expiresIn * 1000,
    sameSite: "strict",
    path: "/",
  });

  response.success(res, {
    ...user.data,
    role: ROLES[user.data.roleId as "USER"] ?? 0,
    token,
    expiresIn,
    password: undefined,
  });
});

export const logoutController = requestErrorHandler<
  unknown,
  unknown,
  LogoutBody,
  unknown
>(async (req, res) => {
  const token = req.body.token;

  try {
    if (typeof token !== "string") return response.success(res, {});

    await UserTokens.destroyByToken({ token });
  } catch (error) {
    // TODO: Log this error
  } finally {
    response.success(res, {});
  }
});

export const forgotPasswordController = requestErrorHandler<
  unknown,
  unknown,
  ForgotPasswordBody,
  unknown
>(async (req, res) => {
  const { email } = req.body;

  const user = await findOneUserModel({ email });

  const { token, expiresIn } = Token.createPasswordReset({
    userId: user?.data?.id ?? "",
  });

  if (!user.success || user.data === null)
    return response.success(res, { expiresIn });

  Email.sendForgotPassword({ to: email, token }).catch(console.error);

  response.success(res, { expiresIn });
});

export const resetPasswordController = requestErrorHandler<
  unknown,
  unknown,
  ResetPasswordBody,
  unknown
>(async (req, res) => {
  const { token, password } = req.body;

  const payload = Token.verifyPasswordReset(token);

  if (payload === undefined) return response.success(res, {});

  updatePassword({
    id: payload.userId,
    password,
  }).catch((e) => {
    console.error(e);
    // TODO: Log this error
  });

  return response.success(res, {});
});
