import { type NextFunction, type Request, type Response } from "express";
import { ENV, MODES, STATUS_CODE } from "../constants/index.js";
import response from "../lib/response/response.js";

const development = (req: Request, res: Response, next: NextFunction) => {
  if (ENV.SERVER_MODE === MODES.DEVELOPMENT) {
    next();
    return;
  }

  response.error(res, {}, STATUS_CODE.UNAUTHORIZED);
};

const modes = {
  development,
};

export default modes;
