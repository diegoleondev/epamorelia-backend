import DB_SYNC_MODES from "./db-sync-modes.js";
import MODES from "./modes.js";

export const ENV = {
  AUTH_SECRET: process.env.AUTH_SECRET ?? "****",

  SERVER_PORT: parseInt(process.env.SERVER_PORT ?? "3000"),
  SERVER_MODE: process.env.SERVER_MODE ?? MODES.PRODUCTION,

  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:3003",

  SSL_KEY_PATH: process.env.SSL_KEY_PATH ?? "",
  SSL_CERT_PATH: process.env.SSL_CERT_PATH ?? "",
  SSL_CA_PATH: process.env.SSL_CA_PATH ?? "",

  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306"),
  DB_USERNAME: process.env.DB_USERNAME ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "****",
  DB_DATABASE: process.env.DB_DATABASE ?? "test",
  DB_DIALECT: process.env.DB_DIALECT ?? ("mariadb" as const),
  DB_SYNC_MODE: process.env.DB_SYNC_MODE ?? DB_SYNC_MODES.CREATE_IF_NOT_EXISTS,

  EMAIL_HOST: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT ?? "465"),
  EMAIL_SECURE: JSON.parse(process.env.EMAIL_SECURE ?? "true") as boolean,
  EMAIL_USER: process.env.EMAIL_USER ?? "admin",
  EMAIL_PASS: process.env.EMAIL_PASS ?? "****",
  EMAIL_FROM: process.env.EMAIL_FROM ?? "",
};

export default ENV;
