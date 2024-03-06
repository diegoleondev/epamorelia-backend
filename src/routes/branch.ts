import {
  createBranchController,
  getAllBranchController,
  getBranchController,
  getBranchUsersController,
  removeBranchController,
  updateBranchController,
} from "../controllers/branch.js";
import checkPayload from "../middlewares/check-payload.js";
import { auth } from "../middlewares/index.js";
import {
  createBranchValidator,
  getBranchUsersValidator,
  getBranchValidator,
  removeBranchValidator,
  updateBranchValidator,
} from "../validators/branch.js";

import { Router } from "express";

const branchRouter = Router();

branchRouter.get(
  "/branch/:branchId",
  auth,
  checkPayload(getBranchValidator),
  getBranchController,
);

branchRouter.get("/branch", auth, getAllBranchController);

branchRouter.get(
  "/branch/:branchId/users",
  auth,
  checkPayload(getBranchUsersValidator),
  getBranchUsersController,
);

branchRouter.post(
  "/branch",
  auth,
  checkPayload(createBranchValidator),
  createBranchController,
);

branchRouter.patch(
  "/branch/:branchId",
  auth,
  checkPayload(updateBranchValidator),
  updateBranchController,
);

branchRouter.delete(
  "/branch/:branchId",
  auth,
  checkPayload(removeBranchValidator),
  removeBranchController,
);

export default branchRouter;
