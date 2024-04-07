import FormUserData from "../schemas/form-user-data.js";
import sequelizeErrorHandler from "../utils/error-handler-sequelize.js";
import EHModel from "./error-handler.js";

interface FormUserDataAttributes {
  id?: string;
  userType?: number;
  name?: string;
  surname?: string;
  phone?: string;
  branchId?: string;
  sex?: boolean;
  emergencyContactFullName?: string;
  emergencyContactPhone?: string;
  allergies?: string;
  diseases?: string;
  medicine?: string;
  editable?: boolean;
  completed?: boolean;
  deleted?: boolean;
}

interface findAllFormUserDataOptions {
  where: {
    branchId?: string;
    deleted?: boolean;
  };
}

export interface CreateFormUserDataProps {
  name: string;
  surname?: string;
  branchId: string;
  createdBy: string;
}

export const findByPkFormUserDataModel = async (props: { id: string }) =>
  await EHModel(async () => {
    const form = await FormUserData.findByPk(props.id);
    return form?.toJSON() ?? null;
  });

export const findAllFormUserDataModel = async (
  options: findAllFormUserDataOptions,
) =>
  await EHModel(async () => {
    const form = await FormUserData.findAll(options);
    return form.map((f) => f.toJSON());
  });

export const createFormUserDataModel = async (
  props: CreateFormUserDataProps,
) => {
  const response = await sequelizeErrorHandler(FormUserData.create(props));

  return { ...response, data: response.data?.toJSON() };
};

export const updateFormUserDataModel = async (
  props: FormUserDataAttributes,
) => {
  const { id, ...rest } = props;

  const response = await sequelizeErrorHandler(
    FormUserData.update(rest, { where: { id } }),
  );

  return response;
};

export const deleteFormUserDataModel = async (props: { id: string }) =>
  await EHModel(async () => {
    const { id } = props;
    await FormUserData.destroy({ where: { id } });
    return id;
  });
