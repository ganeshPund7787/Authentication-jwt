import express from "express";
import { deletedUser, logoutUser, userLogin, userProfile, userRegister, userUpdate } from "../controllers/user.controllers.js";
import { isAutheticated } from "../middleware/Autheticated.js";

const routes = express.Router();

routes.post("/register", userRegister);
routes.post("/login", userLogin);

routes.get("/logout", logoutUser);
routes.get("/profile", isAutheticated, userProfile);

routes.put("/update/:id", isAutheticated, userUpdate);
routes.delete("/delete/:id", isAutheticated, deletedUser);

export default routes;