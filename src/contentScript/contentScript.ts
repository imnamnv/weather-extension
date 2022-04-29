console.log("CONTENT SCRIPT");
chrome.runtime.sendMessage("From the content script", (ressonpe) => {
  console.log("ressonpe", ressonpe);
});
