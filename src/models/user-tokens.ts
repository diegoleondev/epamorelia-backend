import UserToken from "../schemas/user-tokens.js";
import type User from "../schemas/user.js";

interface CreateProps {
  userId: User["id"];
  token: string;
  expiresIn: number;
}

export async function create({ userId, token, expiresIn }: CreateProps) {
  await UserToken.create({
    token,
    userId,
    expiresAt: new Date(Date.now() + expiresIn),
  });
}

interface CheckTokenProps {
  token: string;
  userId: User["id"];
}
export async function checkToken(props: CheckTokenProps) {
  try {
    const userToken = await UserToken.findOne({
      where: { token: props.token },
    });

    if (userToken === null) return false;
    if (userToken.userId !== props.userId) return false;
    if (userToken.expiresAt < new Date()) {
      userToken.destroy().catch(() => {
        /* TODO: LOG ERROR */
      });
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function destroyByToken(props: { token: string }) {
  await UserToken.destroy({
    where: { token: props.token },
  });
}
