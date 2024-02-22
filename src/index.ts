import fs from "node:fs";
import http from "node:http";
import https from "node:https";

import app from "./app.js";
import { ENV, MODES } from "./constants/index.js";
import { connectDatabase } from "./database/database.js";

const server =
  ENV.SERVER_MODE === MODES.PRODUCTION
    ? https.createServer(
        {
          key: fs.readFileSync(ENV.SSL_KEY_PATH),
          cert: fs.readFileSync(ENV.SSL_CERT_PATH),
          ca: fs.readFileSync(ENV.SSL_CA_PATH),
        },
        app,
      )
    : http.createServer(app);

(async () => {
  await connectDatabase();
  console.log("[*] Database connected");

  server.listen(app.get("port"), () => {
    console.log(`[*] Server running on port ${app.get("port")}`);
  });
})().catch((error) => {
  console.error("[*] ERROR", error);
});
