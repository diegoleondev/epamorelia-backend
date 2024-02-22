import { Sequelize } from "sequelize";
import { DB_SYNC_MODES, ENV, MODES } from "../constants/index.js";

const { PRODUCTION } = MODES;
const { DELETE, CREATE_IF_NOT_EXISTS, UPDATE } = DB_SYNC_MODES;
const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
  DB_SYNC_MODE,
  SERVER_MODE,
} = ENV;

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT as "mariadb",
});

export async function connectDatabase() {
  const syncMode =
    SERVER_MODE === PRODUCTION ? CREATE_IF_NOT_EXISTS : DB_SYNC_MODE;

  const sync = {
    [CREATE_IF_NOT_EXISTS]: undefined,
    [DELETE]: { force: true },
    [UPDATE]: { alter: true },
  }[syncMode];

  await sequelize.sync(sync);
  await sequelize.authenticate();
}
