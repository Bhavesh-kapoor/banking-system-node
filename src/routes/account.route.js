import { Router  } from "express";
import { createAccount } from "../controllers/account.controller.js";
const accountRouter = Router()

accountRouter.post('/create',createAccount)



export default accountRouter;