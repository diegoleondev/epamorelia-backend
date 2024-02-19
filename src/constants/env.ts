import DB_SYNC_MODES from "./db-sync-modes.js";
import MODES from "./modes.js";

export const ENV = {
  AUTH_SECRET: process.env.AUTH_SECRET ?? "****",
  SERVER_PORT: parseInt(process.env.SERVER_PORT ?? "3000"),
  SERVER_MODE: process.env.SERVER_MODE ?? MODES.PRODUCTION,
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306"),
  DB_USERNAME: process.env.DB_USERNAME ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "****",
  DB_DATABASE: process.env.DB_DATABASE ?? "test",
  DB_DIALECT: process.env.DB_DIALECT ?? ("mariadb" as const),
  DB_SYNC_MODE: process.env.DB_SYNC_MODE ?? DB_SYNC_MODES.CREATE_IF_NOT_EXISTS,
};

export default ENV;
