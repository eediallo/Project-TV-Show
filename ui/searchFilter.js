import { render } from "./render.js";
import { searchInput, episodeSelector, displayNumber, episodeDropDown } from "./domElements.js";
import { state } from "../data/state.js";
import { createShowCard } from "./shows/createShowCard.js";
import { createEpisodeCard } from "./episodes/createEpisodeCard.js";

function handleSearchAndFilter() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredItems = [];

  if (episodeDropDown.style.display === "none") {
    // Filtering shows
    filteredItems = state.allShows.filter((show) => {
      const showText = `${show.name} ${show.summary}`.toLowerCase();
      return showText.includes(searchTerm);
    });
    render(filteredItems, createShowCard);
  } else {
    // Filtering episodes
    filteredItems = state.allEpisodes.filter((episode) => {
      const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
      return episodeText.includes(searchTerm);
    });
    render(filteredItems, createEpisodeCard);
  }

  displayNumber.textContent = `${filteredItems.length} / ${
    episodeDropDown.style.display === "none" ? state.allShows.length : state.allEpisodes.length
  } item${filteredItems.length !== 1 ? "s" : ""}`;
}

export { handleSearchAndFilter };