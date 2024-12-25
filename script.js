import { getShows } from "./data/getShows.js";
import { searchInput, episodeSelector, showSeletor } from "./ui/domElements.js";
import { state } from "./data/state.js";
import { getEpisodeData } from "./data/getEpisode.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/episodes/renderEpisodes.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";
import { handleSearchAndFilter } from "./ui/searchFilter.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  console.log(state);

  await getEpisodeData(1);
  render(state.allShows);
  renderEpisodeOptions(state.allEpisodes);
  addEventListeners();
}

showSeletor.addEventListener("change", async (e) => {
  for (let show of state.allShows) {
    console.log(show);
  }
  await getEpisodeData(e.target.value);
  render(state.allEpisodes);
  renderEpisodeOptions(state.allEpisodes);
});

function addEventListeners() {
  searchInput.addEventListener("input", handleSearchAndFilter);
  episodeSelector.addEventListener("change", handleSearchAndFilter);
}

window.onload = setup;
