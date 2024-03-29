import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { HEADERS, ROLES, STATUS_CODE } from "../constants/index.js";
import response from "../lib/response/response.js";
import { verifyAuthUser } from "../utils/auth/token.js";

import * as UserTokens from "../models/user-tokens.js";
import { findByPkUserModel } from "../models/user.js";

interface AuthOptions {
  required?: boolean;
}

interface UnauthorizedOptions {
  req: Request;
  res: Response;
  next: NextFunction;
  required: boolean;
}

const unauthorizedMiddleware = (options: UnauthorizedOptions) => {
  const { required, res, req, next } = options;
  return () => {
    if (required) {
      return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
    }

    req.authenticated = false;
    next();
  };
};

const auth = (options?: AuthOptions) =>
  (async (req: Request, res: Response, next: NextFunction) => {
    const { required = true } = options ?? {};

    const token = (req.header(HEADERS.AUTH_TOKEN) ??
      req.cookies.accessToken ??
      req.header("Authorization")?.split(" ")[1]) as string | undefined;

    const unauthorized = unauthorizedMiddleware({ res, req, next, required });

    if (token === undefined) return unauthorized();

    const payload = verifyAuthUser(token);

    if (payload === undefined) return unauthorized();

    const isValid = await UserTokens.checkToken({
      token,
      userId: payload.userId,
    }).catch(() => false);

    if (!isValid) {
      return unauthorized();
    }

    const userResult = await findByPkUserModel({ id: payload.userId });

    if (!userResult.success || userResult.data === null) {
      return unauthorized();
    }

    const { data } = userResult;

    req.authenticated = true;
    req.user = {
      role: ROLES[data.roleId as keyof typeof ROLES],
      ...data,
    };

    next();
  }) as RequestHandler<unknown, unknown, unknown, unknown>;

export default auth;
