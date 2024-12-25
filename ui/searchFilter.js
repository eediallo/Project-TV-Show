import { render } from "./render.js";
import { searchInput, displayNumber, episodeDropDown } from "./domElements.js";
import { state } from "../data/state.js";
import { createShowCard } from "./shows/createShowCard.js";
import { createEpisodeCard } from "./episodes/createEpisodeCard.js";

function handleSearchAndFilter() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredItems = [];
  let itemType = "";

  if (episodeDropDown.style.display === "none") {
    filterShows(filteredItems, state.allShows, searchTerm, itemType);
  } else {
    filterEpisodes(filteredItems, state.allEpisodes, searchTerm, itemType);
  }

  displayNumber.textContent = `${filteredItems.length} / ${
    episodeDropDown.style.display === "none"
      ? state.allShows.length
      : state.allEpisodes.length
  } ${itemType}${filteredItems.length !== 1 ? "s" : ""}`;
}

function filterShows(filteredItems, shows, searchTerm, itemType) {
  filteredItems = shows.filter((show) => {
    const showText = `${show.name} ${show.summary}`.toLowerCase();
    return showText.includes(searchTerm);
  });
  render(filteredItems, createShowCard);
  itemType = "show";
  document.querySelector(".display-label").textContent = "Displaying all shows";
}

function filterEpisodes(filteredItems, episodes, searchTerm, itemType) {
  filteredItems = episodes.filter((episode) => {
    const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
    return episodeText.includes(searchTerm);
  });
  render(filteredItems, createEpisodeCard);
  itemType = "episode";
  document.querySelector(".display-label").textContent =
    "Displaying all episodes";
}

export { handleSearchAndFilter };
