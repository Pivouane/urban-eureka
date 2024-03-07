const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "GUESSWHOSBACK"}, function(response) {
      document.getElementById("stringified").innerHTML = response;
    });
  });
});
