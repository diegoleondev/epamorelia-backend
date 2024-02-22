import { type ValidationError } from "sequelize";
import { DETAILS } from "../constants/index.js";
import User from "../schemas/user.js";
import { ModelError } from "./index.js";

interface CreateProps {
  email: string;
  password: string;
  username: string;
}

export async function create(props: CreateProps) {
  try {
    const user = await User.create(props);
    return String(user.toJSON().id);
  } catch (e) {
    const error = e as ValidationError;
    const ME = new ModelError({
      email: undefined,
      username: undefined,
    });

    const { message } = error.errors[0];
    if (message === "email must be unique") {
      ME.addDetails({
        email: DETAILS.UNIQUE,
      });
    } else if (message === "username must be unique") {
      ME.addDetails({
        username: DETAILS.UNIQUE,
      });
    } else {
      ME.addDetails({
        _: DETAILS.UNKNOWN,
      });
    }

    throw ME;
  }
}

export async function destroy(props: { id: string }) {
  await User.destroy({
    where: { id: props.id },
  });
}

export async function getAuthData(props: { email: string }) {
  return await User.findOne({ where: { email: props.email } }).then((user) => {
    if (user === null) return null;

    return {
      id: user.id,
      password: user.password,
    };
  });
}
