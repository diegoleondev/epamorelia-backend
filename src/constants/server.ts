export const SERVER_MODES = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

export const SERVER_ENV = {
  AUTH_SECRET: process.env.AUTH_SECRET ?? "****",
  SERVER_PORT: parseInt(process.env.PORT ?? "3000"),
  SERVER_MODE: process.env.SERVER_MODE ?? SERVER_MODES.PRODUCTION,
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306"),
  DB_USERNAME: process.env.DB_USERNAME ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "****",
  DB_DATABASE: process.env.DB_DATABASE ?? "test",
  DB_DIALECT: process.env.DB_DIALECT ?? ("mariadb" as const),
};

export const SERVER_HEADERS = {
  AUTH_TOKEN: "auth-token",
};
