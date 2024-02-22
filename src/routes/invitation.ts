import {
  getInvitationUsername,
  postInvitation,
} from "../controllers/invitation.js";
import checkPayload from "../middlewares/check-payload.js";
import { auth } from "../middlewares/index.js";
import * as validator from "../validators/invitations.js";

import { Router } from "express";

const invitationRouter = Router();

invitationRouter.get(
  "/invitation",
  checkPayload(validator.getInvitationUsername),
  getInvitationUsername,
);

invitationRouter.post("/invitation", auth, postInvitation);

export default invitationRouter;
