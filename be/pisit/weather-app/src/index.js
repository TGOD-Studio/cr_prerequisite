import express from "express";
import cors from "cors";
import "dotenv/config";

import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import refreshTokenRouter from "./routes/refresh.js";
import logoutRouter from "./routes/logout.js";

import verifyJWT from "./middleware/verifyJWT.js";
import verifyRoles from "./middleware/verifyRoles.js";
import limiter from "./middleware/rateLimit.js";
import cookieParser from "cookie-parser";

import rolesList from "./database/roles-list.js";

import freeWeather from "./controllers/freeWeatherController.js";
import paidWeather from "./controllers/paidWeatherController.js";

const app = express();

const PORT = process.env.PORT || 3215;

// 200 success, 404 = not found, 400 bad req, 500 internal server error

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);

app.get("/weather/paid", verifyRoles(rolesList.Paid), paidWeather);

app.use(limiter);
app.get("/weather/free", verifyRoles(rolesList.Free), freeWeather);

app.listen(PORT, () => {
  console.log("Running on Port", PORT);
});
