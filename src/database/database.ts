import { Sequelize } from "sequelize";
import { ENV, MODES } from "../constants/index.js";

const { DEVELOPMENT, PRODUCTION } = MODES;

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
  SERVER_MODE,
} = ENV;

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT as "mariadb",
});

export async function connectDatabase() {
  const sync = {
    [DEVELOPMENT]: { alter: true },
    [PRODUCTION]: { force: true },
  }[SERVER_MODE];

  await sequelize.sync(sync);
  await sequelize.authenticate();
}
