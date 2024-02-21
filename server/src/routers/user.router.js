import { Router } from 'express';
import userService from '../services/user.service.js';

const routerUsers = Router();

routerUsers.get("/",userService.Users);

routerUsers.get("/:id",userService.listen);

routerUsers.post("/", userService.CreateUserDto);

routerUsers.put("/:id", userService.UpdatePasswordDto);

routerUsers.delete("/:id", userService.deleteUser);

export default routerUsers;