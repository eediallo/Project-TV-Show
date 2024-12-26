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
    itemType = filterShows(filteredItems, state.allShows, searchTerm);
  } else {
    itemType = filterEpisodes(filteredItems, state.allEpisodes, searchTerm);
  }

  displayFilteredNumber(
    filteredItems,
    state.allShows,
    state.allEpisodes,
    itemType
  );
}

function filterShows(filteredItems, shows, searchTerm) {
  filteredItems.push(
    ...shows.filter((show) => {
      const showText = `${show.name} ${show.summary} ${show.genres}`.toLowerCase();
      return showText.includes(searchTerm);
    })
  );
  render(filteredItems, createShowCard);
  return "show";
}

function filterEpisodes(filteredItems, episodes, searchTerm) {
  filteredItems.push(
    ...episodes.filter((episode) => {
      const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
      return episodeText.includes(searchTerm);
    })
  );
  render(filteredItems, createEpisodeCard);
  return "episode";
}

function displayFilteredNumber(filteredItems, shows, episodes, itemType) {
  displayNumber.textContent = `${filteredItems.length} / ${
    episodeDropDown.style.display === "none" ? shows.length : episodes.length
  } ${itemType}${filteredItems.length !== 1 ? "s" : ""}`;
}

export { handleSearchAndFilter };
