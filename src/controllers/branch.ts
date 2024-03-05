import { ROLES } from "../constants/index.js";
import {
  InternalServerError,
  UnauthorizedError,
} from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import {
  createBranchModel,
  findAllBranchesModel,
  findByPKBranchModel,
  removeBranchModel,
  updateBranchModel,
} from "../models/branch.js";
import { findAllUserModel } from "../models/user.js";
import requestErrorHandler from "../utils/error-handler-request.js";
import type {
  CreateBranchBody,
  GetBranchParams,
  GetBranchUsersParams,
  RemoveBranchParams,
  UpdateBranchBody,
  UpdateBranchParams,
} from "../validators/branch.js";

const { ADMIN, STAFF } = ROLES;

export const getBranchController = requestErrorHandler<
  GetBranchParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { user, params } = req;

  if (params.branchId !== user.branchId) {
    if (user.role < ADMIN) {
      throw new UnauthorizedError();
    }
  }

  const branchResult = await findByPKBranchModel({ id: req.params.branchId });
  if (!branchResult.success) throw new InternalServerError();

  response.success(res, branchResult.data);
});

export const getBranchUsersController = requestErrorHandler<
  GetBranchUsersParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { user, params } = req;

  if (user.role < STAFF) throw new UnauthorizedError();
  if (params.branchId !== user.branchId) {
    if (user.role < ADMIN) throw new UnauthorizedError();
  }

  const users = await findAllUserModel({ branchId: params.branchId });
  if (!users.success) throw new InternalServerError();

  response.success(res, users.data);
});

export const getAllBranchController = requestErrorHandler<
  unknown,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { user } = req;
  if (user.role < ADMIN) throw new UnauthorizedError();

  const branches = await findAllBranchesModel();
  if (!branches.success) throw new InternalServerError();

  response.success(res, branches);
});

export const createBranchController = requestErrorHandler<
  unknown,
  unknown,
  CreateBranchBody,
  unknown
>(async (req, res) => {
  const { user, body } = req;

  if (user.role < ADMIN) throw new UnauthorizedError();

  const branch = await createBranchModel(body);
  if (!branch.success) throw new InternalServerError(branch.details);

  response.success(res, { id: branch.data.id });
});

export const updateBranchController = requestErrorHandler<
  UpdateBranchParams,
  unknown,
  UpdateBranchBody,
  unknown
>(async (req, res) => {
  const { user } = req;

  if (user.role < ADMIN) throw new UnauthorizedError();

  // TODO: handler Error
  await updateBranchModel({
    id: req.params.branchId,
    name: req.body.name,
    limit: req.body.limit,
  });

  response.success(res, null);
});

export const removeBranchController = requestErrorHandler<
  RemoveBranchParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { user, params } = req;

  if (user.role < ADMIN) throw new UnauthorizedError();

  // TODO: handler Error
  await removeBranchModel({ id: params.branchId });

  response.success(res, null);
});
