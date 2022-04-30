import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";
import "./options.css";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((res: LocalStorageOptions) => {
      setOptions(res);
    });
  }, []);

  const handleInputHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSaveHomeCity = () => {
    setFormState("saving");
    setStoredOptions({
      ...options,
    }).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  const handleSwitchShowOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const isFieldsDisable = formState === "saving";

  if (!options) return null;
  return (
    <Box mx={"10%"} my={"2%"}>
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City</Typography>
              <TextField
                value={options.homeCity}
                onChange={(event) => {
                  handleInputHomeCityChange(event.target.value);
                }}
                fullWidth
                placeholder="Enter a home city name"
                disabled={isFieldsDisable}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Show Overlay</Typography>
              <Switch
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => {
                  handleSwitchShowOverlayChange(checked);
                }}
                disabled={isFieldsDisable}
                color="primary"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveHomeCity}
                disabled={isFieldsDisable}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
