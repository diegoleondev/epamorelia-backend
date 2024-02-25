import type { NextFunction, Request, Response } from "express";
import type { ResponseError } from "lib/response/errors.js";

import cookiesParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

import { ENV, STATUS_CODE } from "./constants/index.js";
import response from "./lib/response/response.js";
import cors from "./middlewares/cors.js";
import authRouter from "./routes/auth.js";
import invitationRouter from "./routes/invitation.js";

const app = express();
const { SERVER_PORT } = ENV;

app.set("port", SERVER_PORT);

app.use(morgan("dev"));
app.use(cors);
app.use(express.json());
app.use(cookiesParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>EPA MORELIA ✅</h1>");
});

app.use(authRouter);
app.use(invitationRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const error = err as ResponseError;
    console.error("[A] HANDLED", err.details);
    response.error(res, error.details ?? {}, error.statusCode);
  } catch (error) {
    response.error(res, {}, STATUS_CODE.UNKNOWN_ERROR);
    console.error("[B] UNKNOWN", error);
  }
});

export default app;
