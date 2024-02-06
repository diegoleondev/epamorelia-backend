import app from "./app.js";
import { connectDatabase } from "./database/database.js";

(async () => {
  await connectDatabase();
  console.log("[*] Database connected");

  app.listen(app.get("port"), () => {
    console.log(`[*] Server running on port ${app.get("port")}`);
  });
})().catch((error) => {
  console.error("[*] ERROR", error);
});
