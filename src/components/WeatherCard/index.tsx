import React, { useEffect, useState } from "react";
import {
  fetchOpenWeatherData,
  getWeatherIconSrc,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import "./WeatherCard.css";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale;
}> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => {
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState === "loading" ? "Loading..." : "City not found"}
        </Typography>
      </WeatherCardContainer>
    );
  }
  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography className="weatherCard-temp" variant="body1">
            {weatherData.main.temp}
          </Typography>
          <Typography variant="body1">
            Feels like: {weatherData.main.feels_like}
          </Typography>
        </Grid>
        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img
                src={getWeatherIconSrc(weatherData.weather[0].icon)}
                alt=""
              />
              <Typography variant="body1">
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
