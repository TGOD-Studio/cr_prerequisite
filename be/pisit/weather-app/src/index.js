import express from "express";
import cors from "cors";
import "dotenv/config";

import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import refreshTokenRouter from "./routes/refresh.js";

import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3215;

// 200 success, 404 = not found, 400 bad request, 500 internal server error

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshTokenRouter);

app.use(verifyJWT);

app.get("/weather", async (request, response) => {
  let {
    query: { city },
  } = request;

  if (!city) return response.status(400).json({ message: "Bad request" });

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric&lang=th`
    );

    if (weatherResponse.status === 404)
      return response.status(404).json({ message: "Not found" });

    const fullWeatherData = await weatherResponse.json();

    response.json({
      description: fullWeatherData.weather[0].description,
      temp: fullWeatherData.main.temp,
      feels_like: fullWeatherData.main.feels_like,
      humidity: fullWeatherData.main.humidity,
    });
  } catch (e) {
    console.error(e);
    return response.status(500).json({ message: e.name });
  }
});

app.listen(PORT, () => {
  console.log("Running on Port", PORT);
});
