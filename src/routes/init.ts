import { Router, type RequestHandler, type Response } from "express";
import { createBranchModel } from "../models/branch.js";
import { createUserModel, updatePassword } from "../models/user.js";

const router = Router();

router.get("/init", (async (req: Request, res: Response) => {
  const branchState = await createBranchModel({
    name: "SUPER",
    limit: 999,
  });

  const user = await createUserModel({
    email: "diegoleon.dev@gmail.com",
    password: "123456",
    branchId: branchState.data?.id ?? "",
    roleId: "SUPER",
    username: "root",
  });

  await updatePassword({ id: user.data?.id ?? "", password: "123456" });

  res.send("INIT");
}) as unknown as RequestHandler);

export default router;
