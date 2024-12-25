import { getShows } from "./data/getShows.js";
import {
  searchInput,
  episodeSelector,
  showSelector,
  episodeDropDown,
  showDropDown,
  backToShowsBtn,
} from "./ui/domElements.js";
import { state } from "./data/state.js";
import { getEpisodeData } from "./data/getEpisode.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/render.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";
import { handleSearchAndFilter } from "./ui/searchFilter.js";
import { createShowCard } from "./ui/shows/createShowCard.js";
import { createEpisodeCard } from "./ui/episodes/createEpisodeCard.js";
import { filterEpisodesBySelector } from "./ui/episodes/filterEpisodesBySelector.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  addEventListeners();
}

async function handleShowChange(e) {
  await getEpisodeData(e.target.value);

  episodeDropDown.style.display = "block";
  backToShowsBtn.style.display = "block";
  showDropDown.style.display = "none";

  renderEpisodeOptions(state.allEpisodes);
  render(state.allEpisodes, createEpisodeCard);
}

async function handleBackToShows() {
  episodeDropDown.style.display = "none";
  showDropDown.style.display = "block";
  backToShowsBtn.style.display = "none";
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  showSelector.value = "all-shows";
}

function addEventListeners() {
  searchInput.addEventListener("input", handleSearchAndFilter);
  episodeSelector.addEventListener("change", filterEpisodesBySelector);
  showSelector.addEventListener("change", handleShowChange);
  backToShowsBtn.addEventListener("click", handleBackToShows);
}

window.onload = setup;
