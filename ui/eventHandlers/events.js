import { handleBackToShows } from "./backToShows.js";
import { handleShowChange } from "./showChange.js";
import { handleSearchAndFilter } from "../searchFilter.js";
import { searchInput } from "../domElements.js";
import {
  showSelector,
  episodeSelector,
  backToShowsBtn,
} from "../domElements.js";
import { createEpisodeCard } from "../episodes/createEpisodeCard.js";
import { state } from "../../data/state.js";

function addEventListeners() {
  searchInput.addEventListener("input", handleSearchAndFilter);
  episodeSelector.addEventListener("change", () => {
    if (episodeSelector.value.toLowerCase() === "all-episodes") {
      render(state.allEpisodes, createEpisodeCard);
    } else {
      filterEpisodesBySelector();
    }
  });
  showSelector.addEventListener("change", handleShowChange);
  backToShowsBtn.addEventListener("click", handleBackToShows);
}

export { addEventListeners };
