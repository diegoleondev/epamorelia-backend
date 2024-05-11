import { Router } from "express";
import {
  createFormUserDataController,
  getAllFormUserDataController,
  getFormUserDataController,
  updateFormUserDataController,
  updateFormUserDataPublicController,
  xlsxFormUserDataController,
} from "../controllers/form-user-data.js";
import auth from "../middlewares/auth.js";
import checkPayload from "../middlewares/check-payload.js";
import {
  createFormUserDataValidator,
  deleteFormUserDataValidator,
  getAllFormUserDataValidator,
  getFormUserDataValidator,
  updateFormUserDataPublicValidator,
  updateFormUserDataValidator,
} from "../validators/form-user-data.js";

const formRouter = Router();

formRouter.get(
  "/form/user-data/xlsx/",
  auth(),
  checkPayload(getAllFormUserDataValidator),
  xlsxFormUserDataController,
);

formRouter.get(
  "/form/user-data/:id",
  checkPayload(getFormUserDataValidator),
  getFormUserDataController,
);

formRouter.get(
  "/form/user-data",
  auth(),
  checkPayload(getAllFormUserDataValidator),
  getAllFormUserDataController,
);

formRouter.post(
  "/form/user-data",
  auth(),
  checkPayload(createFormUserDataValidator),
  createFormUserDataController,
);

formRouter.patch(
  "/form/user-data/:id",
  auth(),
  checkPayload(updateFormUserDataValidator),
  updateFormUserDataController,
);

formRouter.patch(
  "/form/user-data/:id/public/",
  checkPayload(updateFormUserDataPublicValidator),
  updateFormUserDataPublicController,
);

formRouter.delete(
  "/form/user-data/:id",
  auth(),
  checkPayload(deleteFormUserDataValidator),
  getFormUserDataController,
);

export default formRouter;
