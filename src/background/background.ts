import { setStoredCities, setStoredOptions } from "../utils/storage";

// console.log("BACKGROUND");
// chrome.runtime.onMessage.addListener((mgs, sender, sendResponse) => {
//   sendResponse("From the bacground script");
//   console.log("sender", sender);
//   console.log("mgs", mgs);
// });

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    homeCity: "",
    tempScale: "metric",
    hasAutoOverlay: false,
  });
});
