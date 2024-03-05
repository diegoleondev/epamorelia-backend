import { type NextFunction, type Request, type Response } from "express";

type RequestHandler<Params, ResBody, ReqBody, ReqQuery> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response,
) => Promise<unknown>;

const requestErrorHandler =
  <Params, ResBody, ReqBody, ResQuery>(
    requestHandler: RequestHandler<Params, ResBody, ReqBody, ResQuery>,
  ) =>
  (
    req: Request<Params, ResBody, ReqBody, ResQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    requestHandler(req, res).catch(next);
  };

export default requestErrorHandler;
