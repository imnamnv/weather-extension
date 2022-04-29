import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { InputBase, IconButton, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Hanoi", "Tokyo", "Error"]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => {
      setCities(cities);
    });

    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === "") return;

    const updatedCities = [...cities, cityInput];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];

    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    console.log("updateOptions", updateOptions);

    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box>
      <Grid container justify="space-evenly">
        <Grid item>
          <Paper>
            <Box px={"15px"} py={"5px"}>
              <InputBase
                value={cityInput}
                placeholder="Add city name"
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py={"4px"}>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity !== "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => {
        return (
          <WeatherCard
            city={city}
            key={city}
            onDelete={() => {
              handleCityDeleteButtonClick(index);
            }}
            tempScale={options.tempScale}
          />
        );
      })}
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
