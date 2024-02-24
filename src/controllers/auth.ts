import type {
  ForgotPasswordBody,
  LoginBody,
  LogoutBody,
  ResetPasswordBody,
  SignupBody,
} from "../validators/auth.js";

import { DETAILS } from "../constants/index.js";
import Email from "../lib/email/index.js";
import { BadRequestError, UnauthorizedError } from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import { compare, encrypt } from "../utils/auth/encrypt.js";
import Token from "../utils/auth/token.js";
import requestErrorHandler from "../utils/requestErrorHandler.js";

import { modelErrorHandlerForResponse } from "../models/index.js";
import * as UserInvitations from "../models/user-invitation.js";
import * as UserTokens from "../models/user-tokens.js";
import * as UserModel from "../models/user.js";

export const signup = requestErrorHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
>(async (req, res) => {
  const { email, invitation, password, username } = req.body;

  if (!(await UserInvitations.checkInvitation({ invitation }))) {
    throw new BadRequestError({ invitation: DETAILS.INVALID });
  }

  const userId = await modelErrorHandlerForResponse(
    UserModel.create({
      email,
      password: await encrypt(password),
      username,
    }),
    (details) => new BadRequestError(details),
  );

  const destroyUser = () => {
    UserModel.destroy({ id: userId }).catch(() => {
      /* TODO: Log Error */
    });
  };

  await UserInvitations.setTargetUser({
    invitation,
    targetId: userId,
  }).catch(() => {
    // TODO: Log this error
    destroyUser();
    throw new BadRequestError({ invitation: DETAILS.UNKNOWN });
  });

  const { token, expiresIn } = Token.createAuthUser({ userId });

  await UserTokens.create({
    token,
    userId,
    expiresIn,
  }).catch(() => {
    // TODO: Log this error
    destroyUser();
    throw new BadRequestError({ _: DETAILS.UNKNOWN });
  });

  response.success(res, { token, expiresIn });
});

export const devSignup = requestErrorHandler<
  unknown,
  unknown,
  SignupBody,
  unknown
>(async (req, res) => {
  const { email, password, username } = req.body;

  const userId = await modelErrorHandlerForResponse(
    UserModel.create({
      email,
      password: await encrypt(password),
      username,
    }),
    (details) => new BadRequestError(details),
  );

  const { token, expiresIn } = Token.createAuthUser({ userId });

  // TODO: Handle this error
  await UserTokens.create({
    token,
    userId,
    expiresIn,
  });

  response.success(res, { token, expiresIn });
});

export const login = requestErrorHandler<unknown, unknown, LoginBody, unknown>(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.getAuthData({ email });

    if (user === null) throw new UnauthorizedError();

    if (!(await compare(password, user.password)))
      throw new UnauthorizedError();

    const { token, expiresIn } = Token.createAuthUser({ userId: user.id });

    await UserTokens.create({
      token,
      userId: user.id,
      expiresIn,
    });

    response.success(res, { token, expiresIn });
  },
);

export const logout = requestErrorHandler<
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

export const forgotPassword = requestErrorHandler<
  unknown,
  unknown,
  ForgotPasswordBody,
  unknown
>(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.getAuthData({ email });

  const { token, expiresIn } = Token.createPasswordReset({
    userId: user?.id ?? "",
  });

  if (user === null) return response.success(res, { expiresIn });

  Email.sendForgotPassword({ to: email, token }).catch(console.error);

  response.success(res, { expiresIn });
});

export const resetPassword = requestErrorHandler<
  unknown,
  unknown,
  ResetPasswordBody,
  unknown
>(async (req, res) => {
  const { token, password } = req.body;

  const payload = Token.verifyPasswordReset(token);

  if (payload === undefined) return response.success(res, {});

  UserModel.updatePassword({
    id: payload.userId,
    password,
  }).catch((e) => {
    console.error(e);
    // TODO: Log this error
  });

  return response.success(res, {});
});
