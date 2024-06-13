import express from "express";
const router = express.Router();
import handleNewUser from "../controllers/registerController.js";

const registerRouter = router.post("/", handleNewUser);

export default registerRouter;
