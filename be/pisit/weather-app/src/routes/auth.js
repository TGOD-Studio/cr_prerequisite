import express from "express";
const router = express.Router();
import handleLogin from "../controllers/authController.js";

const authRouter = router.post("/", handleLogin);

export default authRouter;
