import { type NextFunction, type Request, type Response } from "express";
import response from "../lib/response/response.js";
import { type Check } from "../validators/handler.js";

const checkPayload =
  (check: Check) => (req: Request, res: Response, next: NextFunction) => {
    const { params, query, body } = req;

    const { details, success } = check({ body, params, query });

    if (!success) {
      return response.error(res, details, 400);
    }

    next();
  };

export default checkPayload;
