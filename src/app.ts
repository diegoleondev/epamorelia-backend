import express from "express";
import morgan from "morgan";
import { SERVER_ENV } from "./constants/server.js";

const app = express();
const { SERVER_PORT } = SERVER_ENV;

app.set("port", SERVER_PORT);

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World! 🐎");
});

export default app;
