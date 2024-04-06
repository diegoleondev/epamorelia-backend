import { Router } from "express";
import { checkPayload } from "../middlewares/index.js";

import {
  forgotPasswordController,
  loginController,
  logoutController,
  resetPasswordController,
  signupController,
  verifyController,
} from "../controllers/auth.js";
import {
  forgotPasswordValidator,
  loginValidator,
  logoutValidator,
  resetPasswordValidator,
  signupValidator,
  verifyValidator,
} from "../validators/auth.js";

const authRouter = Router();

authRouter.post("/auth/login", checkPayload(loginValidator), loginController);

authRouter.post(
  "/auth/signup",
  checkPayload(signupValidator),
  signupController,
);

authRouter.post(
  "/auth/logout",
  checkPayload(logoutValidator),
  logoutController,
);

authRouter.post(
  "/auth/forgot-password",
  checkPayload(forgotPasswordValidator),
  forgotPasswordController,
);

authRouter.post(
  "/auth/reset-password",
  checkPayload(resetPasswordValidator),
  resetPasswordController,
);

authRouter.get("/auth/verify", checkPayload(verifyValidator), verifyController);

export default authRouter;
