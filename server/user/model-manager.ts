import { User, UserCreationResponse, ErrorResponse } from "./userModel";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const usersData = require("../users.json");
let users: User[] = usersData as User[];

export class UserService {
  static createUser(userData: User): UserCreationResponse | ErrorResponse {
    //check if the user already signed up
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      return { error: "Email address is already in use." };
    }
    //
    const userId = uuidv4();
    const newUser: User = { ...userData, userId };
    users.push(newUser);
    UserService.saveUsers();
    return { ...userData, userId, message: "User created successfully." };
  }

  static saveUsers(): void {
    const filePath = "./users.json";
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(filePath, data, "utf8");
  }
}
