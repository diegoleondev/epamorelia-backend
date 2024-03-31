import type { NextFunction, Request, Response } from "express";
import type { ResponseError } from "lib/response/errors.js";

import cookiesParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

import { ENV, STATUS_CODE } from "./constants/index.js";
import response from "./lib/response/response.js";
// TODO: Configure CORS Package
// import cors from "./middlewares/cors.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
import branchRouter from "./routes/branch.js";
import formRouter from "./routes/form.js";
import init from "./routes/init.js";
import userInvitationRouter from "./routes/user-invitation.js";

const app = express();
const { SERVER_PORT } = ENV;

app.set("port", SERVER_PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookiesParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1>EPA MORELIA ✅</h1>");
});

app.use(authRouter);
app.use(formRouter);
app.use(userInvitationRouter);
app.use(branchRouter);
app.use(init);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  try {
    const error = err as ResponseError;
    response.error(res, error.details ?? {}, error.statusCode);
  } catch (error) {
    response.error(res, {}, STATUS_CODE.UNKNOWN_ERROR);
  }
});

export default app;
