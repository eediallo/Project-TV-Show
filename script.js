import { getShows } from "./data/getShows.js";
import {
  searchInput,
  episodeSelector,
  showSeletor,
  episodeDropDown,
  showDropDown,
} from "./ui/domElements.js";
import { state } from "./data/state.js";
import { getEpisodeData } from "./data/getEpisode.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/render.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";
import { handleSearchAndFilter } from "./ui/searchFilter.js";
import { createShowCard } from "./ui/shows/createShowCard.js";
import { createEpisodeCard } from "./ui/episodes/createEpisodeCard.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  addEventListeners();
}

showSeletor.addEventListener("change", async (e) => {
  await getEpisodeData(e.target.value);

  episodeDropDown.style.display = "block";
  showDropDown.style.display = 'none'

  renderEpisodeOptions(state.allEpisodes);
  render(state.allEpisodes, createEpisodeCard);
});

function addEventListeners() {
  searchInput.addEventListener("input", () => {
    handleSearchAndFilter(state.allShows, createShowCard);
  });
  episodeSelector.addEventListener("change", () => {
    handleSearchAndFilter(state.allEpisodes, createEpisodeCard);
  });
}

window.onload = setup;
