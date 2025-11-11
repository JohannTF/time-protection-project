import express from "express";
import { showLogin, showRegister, registerUser, loginUser, logoutUser, userPage } from "../controllers/authController.js";
import { timeProtection } from "../middleware/timeProtection.js";

const router = express.Router();

router.get("/login", showLogin);
router.get("/register", showRegister);
router.get("/user", userPage);
router.get("/logout", logoutUser);

router.post("/login", timeProtection, loginUser);
router.post("/register", timeProtection, registerUser);

export default router;
