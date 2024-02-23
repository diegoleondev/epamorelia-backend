import jwt from "jsonwebtoken";
import { ENV } from "../../constants/index.js";

interface CreateProps {
  body: Record<string, unknown>;
  expiresIn?: number | string;
}

interface AuthUserToken {
  userId: string;
}

export const create = (props: CreateProps) => {
  return jwt.sign(props.body, ENV.AUTH_SECRET, {
    expiresIn: props.expiresIn ?? "1d",
  });
};

export const verify = <T>(token: string) => {
  try {
    return jwt.verify(token, ENV.AUTH_SECRET) as T;
  } catch (error) {
    return undefined;
  }
};

export const createAuthUser = (props: AuthUserToken) => {
  const expiresIn = 1000 * 60 * 60 * 24 * 30;
  const token = create({
    body: props as any,
    expiresIn: Math.floor(expiresIn / 1000),
  });

  return { token, expiresIn };
};

export const verifyAuthUser = (token: string) => {
  return verify<AuthUserToken>(token);
};

export const createPasswordReset = (props: AuthUserToken) => {
  const expiresIn = 1000 * 60 * 5;

  const token = create({
    body: props as any,
    expiresIn: Math.floor(expiresIn / 1000),
  });

  return { token, expiresIn };
};

export const verifyPasswordReset = (token: string) => {
  return verify<AuthUserToken>(token);
};

export default {
  create,
  createAuthUser,
  createPasswordReset,
  verify,
  verifyAuthUser,
  verifyPasswordReset,
};
