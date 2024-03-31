import { InternalServerError } from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import { findOneUserModel } from "../models/user.js";
import requestErrorHandler from "../utils/error-handler-request.js";
import { type GetUserParams } from "../validators/user.js";

export const getUserController = requestErrorHandler<
  GetUserParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { id } = req.params;

  const userResult = await findOneUserModel({ id });
  if (!userResult.success) throw new InternalServerError(userResult.details);

  response.success(res, userResult.data);
});
