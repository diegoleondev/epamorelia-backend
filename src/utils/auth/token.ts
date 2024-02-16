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

export const verify = (token: string) => {
  return jwt.verify(token, ENV.AUTH_SECRET);
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
  return verify(token) as AuthUserToken;
};

export default { create, createAuthUser, verify, verifyAuthUser };
