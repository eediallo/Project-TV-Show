const searchInput = document.getElementById("search-input");
const displayNumber = document.getElementById("display-number");
const episodeSelector = document.getElementById("episode-selector");
const showSelector = document.getElementById("show-selector");
const rootElement = document.getElementById("root");
const episodeDropDown = document.querySelector("#episode-drop-down");
const showDropDown = document.querySelector("#show-drop-down");
const backToShowsBtn = document.querySelector("#back-to-shows-btn");

backToShowsBtn.style.display = "none";
episodeDropDown.style.display = "none";

export {
  searchInput,
  displayNumber,
  episodeSelector,
  showSelector,
  rootElement,
  episodeDropDown,
  showDropDown,
  backToShowsBtn,
};
