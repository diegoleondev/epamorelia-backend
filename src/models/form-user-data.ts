import FormUserData from "../schemas/form-user-data.js";
import sequelizeErrorHandler from "../utils/error-handler-sequelize.js";

interface FormUserDataAttributes {
  id?: string;
  userType?: number;
  fullName?: string;
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

interface CreateFormUserDataBody {
  fullName: string;
  branchId: string;
  createdBy: string;
}

export const findByPkFormUserDataModel = async (props: { id: string }) => {
  const response = await sequelizeErrorHandler(FormUserData.findByPk(props.id));

  return { ...response, data: response.data?.toJSON() ?? null };
};

export const findAllFormUserDataModel = async (
  options: findAllFormUserDataOptions,
) => {
  const response = await sequelizeErrorHandler(FormUserData.findAll(options));

  return {
    ...response,
    data: response.data?.map((item) => item.toJSON()) ?? null,
  };
};

export const createFormUserDataModel = async (
  props: CreateFormUserDataBody,
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

export const deleteFormUserDataModel = async (props: { id: string }) => {
  const response = await sequelizeErrorHandler(
    FormUserData.destroy({ where: { id: props.id } }),
  );

  return response;
};
