import {
  createUserInvitationController,
  getAllUserInvitationsController,
  getUserInvitationController,
} from "../controllers/user-invitation.js";
import checkPayload from "../middlewares/check-payload.js";
import { auth } from "../middlewares/index.js";
import {
  createUserInvitationValidator,
  getAllUserInvitationsValidator,
  getUserInvitationValidator,
} from "../validators/user-invitations.js";

import { Router } from "express";

const invitationRouter = Router();

invitationRouter.get(
  "/user-invitation/:id",
  checkPayload(getUserInvitationValidator),
  getUserInvitationController,
);

invitationRouter.get(
  "/user-invitations",
  auth(),
  checkPayload(getAllUserInvitationsValidator),
  getAllUserInvitationsController,
);

invitationRouter.post(
  "/user-invitation",
  auth(),
  checkPayload(createUserInvitationValidator),
  createUserInvitationController,
);

export default invitationRouter;
