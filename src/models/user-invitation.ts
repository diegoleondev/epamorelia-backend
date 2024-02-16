import UserInvitation from "../schemas/user-invitations.js";
import User from "../schemas/user.js";

export const create = async (props: {
  sourceId: UserInvitation["sourceUserId"];
}) => {
  // TODO - HANDLE ERROR
  const invitation = await UserInvitation.create({
    sourceUserId: props.sourceId,
  });

  return String(invitation.toJSON().id);
};

interface IsValidProps {
  invitation: string;
}
export const checkInvitation = async (props: IsValidProps) => {
  try {
    const invitation = await UserInvitation.findOne({
      where: { targetUserId: props.invitation },
    });
    if (invitation === null) return false;

    return typeof invitation?.targetUserId !== "string";
  } catch (error) {
    return false;
  }
};

interface SetTargetUserProps {
  invitation: string;
  targetId: string;
}
export const setTargetUser = async (props: SetTargetUserProps) => {
  return await UserInvitation.update(
    {
      targetUserId: props.targetId,
    },
    { where: { id: props.invitation } },
  );
};

export const getSourceUsername = async (props: { id: string }) => {
  try {
    const invitation = await UserInvitation.findOne({
      where: {
        id: props.id,
      },
    });
    if (invitation === null) return null;

    const user = await User.findByPk(invitation.sourceUserId);
    if (user === null) return null;

    return String(user.username);
  } catch (error) {
    return null;
  }
};
