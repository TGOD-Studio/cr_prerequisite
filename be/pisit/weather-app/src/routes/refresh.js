import express from "express";
const router = express.Router();
import refreshTokenController from "../controllers/refreshTokenController.js";

const refreshTokenRouter = router.get("/", refreshTokenController);

export default refreshTokenRouter;
