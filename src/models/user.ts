import User from "../schemas/user.js";
import { encrypt } from "../utils/auth/encrypt.js";
import sequelizeErrorHandler from "../utils/error-handler-sequelize.js";

interface CreateProps {
  email: string;
  password: string;
  username: string;
  roleId: string;
  branchId: string;
}

interface UserParams {
  id?: string;
  email?: string;
  branchId?: string;
  roleId?: string;
}

export async function findByPkUserModel(props: { id: string }) {
  const response = await sequelizeErrorHandler(User.findByPk(props.id));

  return { ...response, data: response.data?.toJSON() ?? null };
}

export const findAllUserModel = async (where: UserParams) => {
  // @ts-expect-error - I don't know why this is not working
  const users = await sequelizeErrorHandler(User.findAll({ where }));

  return { ...users, data: users.data?.map((user) => user.toJSON()) ?? null };
};

export async function findOneUserModel(where: UserParams) {
  // @ts-expect-error - I don't know why this is not working
  const response = await sequelizeErrorHandler(User.findOne({ where }));

  return { ...response, data: response.data?.toJSON() ?? null };
}

export async function createUserModel(props: CreateProps) {
  const response = await sequelizeErrorHandler(
    User.create({
      ...props,
      password: await encrypt(props.password),
    }),
  );

  return { ...response, data: response.data?.toJSON() ?? null };
}

export async function destroyUserModel(where: UserParams) {
  // @ts-expect-error - I don't know why this is not working
  await User.destroy({ where });
}

export async function updatePassword(props: { id: string; password: string }) {
  await User.update(
    { password: await encrypt(props.password) },
    { where: { id: props.id } },
  );
}
