import express = require("express");
import { Request, Response } from "express";
import { UserService } from "./model-manager";
import * as userController from "./userController";
const router = express.Router();

//@desc: create a new user
//@route: POST /users

//can be simplified as `router.post("/users", UserController.createUser)`;
router.post("/users", (req: Request, res: Response) => {
  const result = UserService.createUser(req.body);
  if ("error" in result) {
    res.status(400).send(result.error);
  } else {
    res.status(201).send(result);
  }
});

export default router;
