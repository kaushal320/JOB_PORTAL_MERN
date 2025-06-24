import express from "express";
import {
  register,
  logout,
  login,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, updateProfile);
export default router;
