import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../components/WeatherCard";
import { Messages } from "../utils/messages";
import { getStoredOptions, LocalStorageOptions } from "../utils/storage";
import "./contentScript.css";
const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleMessages = (msg: Messages, sender, sendResponse) => {
    if (msg === Messages.TOGGLE_OVERLAY) {
      setIsActive(!isActive);
      sendResponse();
    }
  };

  useEffect(() => {
    getStoredOptions()
      .then((options) => {
        setOptions(options);
        setIsActive(options.hasAutoOverlay);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, [isActive]);

  if (!options) return null;
  return (
    <>
      {isActive && (
        <div className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => {
              setIsActive(false);
            }}
          />
        </div>
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
