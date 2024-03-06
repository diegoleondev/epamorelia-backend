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

const auth = (async (req: Request, res: Response, next: NextFunction) => {
  const token = (req.header(HEADERS.AUTH_TOKEN) ??
    req.cookies.accessToken ??
    req.header("Authorization")?.split(" ")[1]) as string | undefined;

  if (token === undefined)
    return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);

  const payload = verifyAuthUser(token);

  if (payload === undefined)
    return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);

  const isValid = await UserTokens.checkToken({
    token,
    userId: payload.userId,
  }).catch(() => false);

  if (!isValid) {
    return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
  }

  const userResult = await findByPkUserModel({ id: payload.userId });

  if (!userResult.success || userResult.data === null) {
    return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
  }

  const { data } = userResult;

  req.user = {
    role: ROLES[data.roleId as keyof typeof ROLES],
    ...data,
  };

  next();
}) as RequestHandler<unknown, unknown, unknown, unknown>;

export default auth;
