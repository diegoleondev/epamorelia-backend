import https = require("node:https");
import fs = require("node:fs");

import app from "./app.js";
import { ENV, MODES } from "./constants/index.js";
import { connectDatabase } from "./database/database.js";

const sslCredentials = {
  key: fs.readFileSync(ENV.SSL_KEY_PATH),
  cert: fs.readFileSync(ENV.SSL_CERT_PATH),
  ca:
    ENV.SERVER_MODE === MODES.PRODUCTION
      ? fs.readFileSync(ENV.SSL_CA_PATH)
      : undefined,
};

const server = https.createServer(sslCredentials, app);

(async () => {
  await connectDatabase();
  console.log("[*] Database connected");

  server.listen(app.get("port"), () => {
    console.log(`[*] Server running on port ${app.get("port")}`);
  });
})().catch((error) => {
  console.error("[*] ERROR", error);
});
