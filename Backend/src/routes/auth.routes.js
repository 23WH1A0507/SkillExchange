import { Router } from "express";
import {
  googleAuthCallback,
  googleAuthHandler,
  handleGoogleLoginCallback,
  handleLogout,
  localLogin,
  localRegister,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", localLogin);
router.post("/register", localRegister);
router.get("/google", googleAuthHandler);
router.get("/google/callback", googleAuthCallback, handleGoogleLoginCallback);
router.get("/logout", handleLogout);

export default router;
