import { getShows } from "./data/getShows.js";
import { searchInput, episodeSelector, showSeletor } from "./ui/domElements.js";
import { state } from "./data/state.js";
import { getEpisodeData } from "./data/getEpisode.js";
import { renderShowsOptions } from "./ui/showOption.js";
import { renderEpisodes } from "./ui/episodes/renderEpisodes.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";
import { handleSearchAndFilter } from "./ui/searchFilter.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);

  // await getEpisodeData(1);
  // renderEpisodes(state.allEpisodes);
  // renderEpisodeOptions(state.allEpisodes);
  addEventListeners();
}

showSeletor.addEventListener("change", async (e) => {
  await getEpisodeData(e.target.value);
  renderEpisodes(state.allEpisodes);
  renderEpisodeOptions(state.allEpisodes);
});

function addEventListeners() {
  searchInput.addEventListener("input", handleSearchAndFilter);
  episodeSelector.addEventListener("change", handleSearchAndFilter);
}

window.onload = setup;
