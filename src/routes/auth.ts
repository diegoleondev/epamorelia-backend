import { Router } from "express";

import { checkPayload, mode } from "../middlewares/index.js";

import * as controllers from "../controllers/auth.js";
import * as validator from "../validators/auth.js";

const authRouter = Router();

authRouter.post(
  "/auth/login",
  checkPayload(validator.login),
  controllers.login,
);

authRouter.post(
  "/auth/signup",
  checkPayload(validator.signup),
  controllers.signup,
);

authRouter.post(
  "/auth/logout",
  checkPayload(validator.logout),
  controllers.logout,
);

// development only
authRouter.post(
  "/auth/dev/signup",
  mode.development,
  checkPayload(validator.signup),
  controllers.devSignup,
);

export default authRouter;
