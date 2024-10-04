import { Request, Response } from "express";
import { User } from "./userModel";
import { UserService } from "./model-manager";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const user: User = req.body;
    const result = UserService.createUser(user);

    if ("error" in result) {
      res.status(400).json(result);
    } else {
      res.status(201).json(result);
    }
  }
}
