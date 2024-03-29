import DETAILS from "../constants/details.js";
import ROLES from "../constants/roles.js";
import {
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../lib/response/errors.js";
import response from "../lib/response/response.js";
import { findByPKBranchModel } from "../models/branch.js";
import {
  createFormUserDataModel,
  deleteFormUserDataModel,
  findAllFormUserDataModel,
  findByPkFormUserDataModel,
  updateFormUserDataModel,
} from "../models/form-user-data.js";
import { isNullish } from "../utils/check.js";
import requestErrorHandler from "../utils/error-handler-request.js";
import {
  type CreateFormUserDataBody,
  type DeleteFormUserDataParams,
  type GetAllFormUserDataQuery,
  type GetFormUserDataParams,
  type UpdateFormUserDataBody,
  type UpdateFormUserDataParams,
  type UpdateFormUserDataPublicBody,
  type UpdateFormUserDataPublicParams,
} from "../validators/form-user-data.js";

export const getFormUserDataController = requestErrorHandler<
  GetFormUserDataParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { id } = req.params;

  const form = await findByPkFormUserDataModel({ id });
  if (!form.success || isNullish(form.data)) throw new NotFoundError();

  const branch = await findByPKBranchModel({ id: form.data?.branchId ?? "" });
  if (!branch.success || isNullish(branch.data))
    throw new InternalServerError();

  response.success(res, {
    ...form.data,
    branchName: branch.data.name,
  });
});

export const getAllFormUserDataController = requestErrorHandler<
  unknown,
  unknown,
  unknown,
  GetAllFormUserDataQuery
>(async (req, res) => {
  const { user } = req;
  const { branchId } = req.query;

  if (user.role < ROLES.STAFF) throw new UnauthorizedError();

  if (user.role < ROLES.ADMIN) {
    if (typeof branchId !== "string") throw new UnauthorizedError();
    if (branchId !== user.branchId) throw new UnauthorizedError();
  }

  const result = await findAllFormUserDataModel({
    where: { branchId, deleted: false },
  });

  if (!result.success) throw new InternalServerError();

  response.success(res, result.data);
});

export const createFormUserDataController = requestErrorHandler<
  unknown,
  unknown,
  CreateFormUserDataBody,
  unknown
>(async (req, res) => {
  const { body } = req;

  if (req.user.role < ROLES.STAFF) throw new UnauthorizedError();
  if (req.user.role < ROLES.ADMIN) {
    if (req.user.branchId !== body.branchId) throw new UnauthorizedError();
  }

  const result = await createFormUserDataModel({
    ...body,
    createdBy: req.user.id,
  });
  if (!result.success || result.data === null) throw new InternalServerError();

  response.success(res, { id: result.data?.id });
});

export const updateFormUserDataPublicController = requestErrorHandler<
  UpdateFormUserDataPublicParams,
  unknown,
  UpdateFormUserDataPublicBody,
  unknown
>(async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const bodyLocked: typeof body = {
    allergies: body.allergies,
    diseases: body.diseases,
    emergencyContactFullName: body.emergencyContactFullName,
    emergencyContactPhone: body.emergencyContactPhone,
    medicine: body.medicine,
    phone: body.phone,
    sex: body.sex,
    userType: body.userType,
  };

  const form = await findByPkFormUserDataModel({ id });
  if (!form.success || form.data === null) throw new NotFoundError();

  if (form.data.editable === false)
    throw new UnauthorizedError({ _: DETAILS.LOCKED });

  const formU = await updateFormUserDataModel({
    id,
    ...bodyLocked,
    editable: false,
    completed: true,
  });

  if (!formU.success) throw new InternalServerError(formU.details);

  response.success(res, form.data);
});

export const updateFormUserDataController = requestErrorHandler<
  UpdateFormUserDataParams,
  unknown,
  UpdateFormUserDataBody,
  unknown
>(async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const lockedBody: typeof body = {
    deleted: body.deleted,
    editable: body.editable,
  };

  if (req.user.role < ROLES.STAFF) throw new UnauthorizedError();

  const form = await updateFormUserDataModel({ id, ...lockedBody });
  if (!form.success) throw new InternalServerError(form.details);

  response.success(res, form.data);
});

export const deleteFormUserDataController = requestErrorHandler<
  DeleteFormUserDataParams,
  unknown,
  unknown,
  unknown
>(async (req, res) => {
  const { id } = req.params;

  if (req.user.role < ROLES.STAFF) throw new UnauthorizedError();
  if (req.user.role < ROLES.ADMIN) {
    const result = await findByPkFormUserDataModel({ id });
    if (result.data === null) throw new InternalServerError();
    if (req.user.branchId !== result.data.branchId)
      throw new UnauthorizedError();
  }

  const result = await deleteFormUserDataModel({ id });
  response.success(res, result);
});
