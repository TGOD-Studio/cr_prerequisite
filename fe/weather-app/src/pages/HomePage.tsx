import {
  Group,
  Paper,
  Select,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { City } from "country-state-city";
import { useEffect, useState } from "react";

const server_url = import.meta.env.VITE_SERVER_URL;
const cities = [
  ...new Set(City.getCitiesOfCountry("TH")!.map((city) => city.name)),
];
type weatherType = {
  description: string;
  temp: number;
  feels_like: number;
  humidity: string;
};

const HomePage = () => {
  const [value, setValue] = useState<string | null>("");
  const [weather, setWeather] = useState<weatherType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    if (value) {
      fetch(`${server_url}/?city=${value}`)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error((await response.json()).message);
          }
          return response.json();
        })
        .then((data) => {
          setWeather({
            description: data.description,
            temp: data.temp,
            feels_like: data.feels_like,
            humidity: data.humidity,
          });
          setErrorMessage(null);
        })
        .catch((error) => {
          setWeather(null);
          setErrorMessage(error.message);
        });
    } else {
      setWeather(null);
      setErrorMessage(null);
    }
  }, [value]);

  return (
    <>
      <Paper
        withBorder
        radius="md"
        p="lg"
        style={{
          width: "320px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Title order={2} mb={8}>
          City weather
        </Title>
        <Select
          placeholder="Pick city"
          data={cities}
          value={value}
          onChange={setValue}
          searchable
          clearable
        />
        {weather && (
          <div>
            <Title order={3} mb={4} mt={16}>
              Weather Information
            </Title>
            <Group gap={4}>
              <Text>Description: {weather.description}</Text>
              <Text>Temperature: {weather.temp}°C</Text>
              <Text>Feels Like: {weather.feels_like}°C</Text>
              <Text>Humidity: {weather.humidity}%</Text>
            </Group>
          </div>
        )}
        {errorMessage && (
          <p style={{ color: theme.colors.red[6], fontSize: "14px" }}>
            {errorMessage}
          </p>
        )}
      </Paper>
      <Text
        style={{
          position: "fixed",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        ta="center"
      >
        กะจะทำดีกว่านี้แหละ แต่ดันเป็นไข้พอดี
        <br />
        แต่มั่นใจว่าไม่มี Error ไหนเกิดจาก Front-end
        <br />
        ถึงอย่างนั้นหลายจุดต้องดูจาก Front-end นี่แหละว่าเพราะอะไร
      </Text>
    </>
  );
};

export default HomePage;
