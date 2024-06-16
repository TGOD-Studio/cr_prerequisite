const paidWeather = async (req, res, next) => {
  let {
    query: { city },
  } = req;

  if (!city) return res.status(400).json({ message: "Bad req" });

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric&lang=th`
    );

    if (weatherResponse.status === 404)
      return res.status(404).json({ message: "Not found" });

    const fullWeatherData = await weatherResponse.json();

    res.json({
      description: fullWeatherData.weather[0].description,
      temp: fullWeatherData.main.temp,
      feels_like: fullWeatherData.main.feels_like,
      humidity: fullWeatherData.main.humidity,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.name });
  }
};

export default paidWeather;
