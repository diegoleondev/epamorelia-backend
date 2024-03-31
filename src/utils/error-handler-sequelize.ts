import { type ValidationError } from "sequelize";
import DETAILS from "../constants/details.js";

type Details = Record<string, string>;

type Response<T> =
  | {
      data: T;
      details: Details;
      success: true;
    }
  | {
      data: null;
      details: Details;
      success: false;
    };

function sequelizeErrorToDetails(e: any): Details {
  try {
    const error = e as ValidationError;

    const message = error.errors[0].message.split(" ");
    let key = message.shift() ?? "";
    const value = message.join(" ");

    let detail: string | undefined;

    if (value === "must be unique") {
      detail = DETAILS.UNIQUE;
    } else {
      key = "_";
      detail = DETAILS.UNKNOWN;
    }

    return {
      [key]: detail,
    };
  } catch (error) {
    return { _: DETAILS.UNKNOWN };
  }
}

export default async function sequelizeErrorHandler<P>(
  promise: Promise<P>,
): Promise<Response<P>> {
  try {
    const data = await promise;

    return {
      data,
      details: {},
      success: true,
    };
  } catch (error) {
    console.error("[*] sequelizeErrorHandler");
    console.error(error);

    return {
      data: null,
      details: sequelizeErrorToDetails(error),
      success: false,
    };
  }
}
