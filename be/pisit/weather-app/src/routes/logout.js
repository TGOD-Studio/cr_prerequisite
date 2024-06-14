import express from "express";
const router = express.Router();
import handleLogout from "../controllers/logoutController.js";

const logoutRouter = router.get("/", handleLogout);

export default logoutRouter;
