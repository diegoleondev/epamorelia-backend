import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { HEADERS, STATUS_CODE } from "../constants/index.js";
import response from "../lib/response/response.js";
import { verifyAuthUser } from "../utils/auth/token.js";

import * as UserTokens from "../models/user-tokens.js";

const auth = (async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header(HEADERS.AUTH_TOKEN);

  if (token === undefined) {
    return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
  }

  const payload = verifyAuthUser(token);

  UserTokens.checkToken({ token, userId: payload.userId })
    .then((isValid) => {
      if (!isValid) {
        return response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
      }

      req.userId = payload.userId;
      next();
    })
    .catch((error) => {
      console.error(error);
      response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
    });
}) as RequestHandler<unknown, unknown, unknown, unknown>;

export default auth;
