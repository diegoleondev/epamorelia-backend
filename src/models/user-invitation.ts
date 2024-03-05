import Branch from "../schemas/branch.js";
import UserInvitation from "../schemas/user-invitations.js";
import User from "../schemas/user.js";
import sequelizeErrorHandler from "../utils/error-handler-sequelize.js";

interface FindAllUserInvitationsProps {
  where?: {
    branchId?: string;
  };
}

interface CreateUserInvitationModelProps {
  sourceUserId: string;
  roleId: string;
  branchId: string;
  reference?: string;
}

interface UpdateUserInvitationModelProps {
  id: string;
  targetUserId?: string;
  roleId?: string;
  branchId?: string;
}

export const findByPkUserInvitationModel = async (props: { id: string }) => {
  try {
    const invitation = await UserInvitation.findByPk(props.id);

    if (invitation === null) return null;

    const sourceUser = await User.findByPk(invitation.sourceUserId);
    if (sourceUser === null) return null;

    let targetUser = null;
    if (invitation.targetUserId !== null)
      targetUser = await User.findByPk(invitation.targetUserId);

    const branch = await Branch.findByPk(invitation.branchId);

    return {
      ...invitation.toJSON(),
      sourceUserName: sourceUser.toJSON().username,
      targetUserName: targetUser?.toJSON().username ?? null,
      branchName: branch?.toJSON().name ?? null,
    };
  } catch (error) {
    return null;
  }
};

export const findAllUserInvitationsModel = async (
  props: FindAllUserInvitationsProps,
) => {
  const result = await sequelizeErrorHandler(UserInvitation.findAll(props));

  return { ...result, data: result.data?.map((i) => i.toJSON()) ?? [] };
};

export const createUserInvitationModel = async (
  props: CreateUserInvitationModelProps,
) => {
  const invitation = await UserInvitation.create(props);

  return String(invitation.id);
};

export const updateUserInvitationModel = async (
  props: UpdateUserInvitationModelProps,
) => {
  const { id, ...rest } = props;

  return await sequelizeErrorHandler(
    UserInvitation.update(rest, { where: { id } }),
  );
};
