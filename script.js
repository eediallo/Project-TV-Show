import { getShows } from "./data/getShows.js";
import { searchInput, episodeSelector, showSeletor } from "./ui/domElements.js";
import { state } from "./data/state.js";
import { getEpisodeData } from "./data/getEpisode.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/render.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";
import { handleSearchAndFilter } from "./ui/searchFilter.js";
import { createShowCard } from "./ui/shows/createShowCard.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  console.log(state);

  await getEpisodeData(1);
  render(state.allShows, createShowCard);
  renderEpisodeOptions(state.allEpisodes);
  addEventListeners();
}

showSeletor.addEventListener("change", async (e) => {
  for (let show of state.allShows) {
    console.log(show);
  }
  await getEpisodeData(e.target.value);
  render(state.allEpisodes, createShowCard);
  renderEpisodeOptions(state.allEpisodes);
});

function addEventListeners() {
  searchInput.addEventListener("input", () => {
    handleSearchAndFilter(state.allShows, createShowCard);
  });
  episodeSelector.addEventListener("change", handleSearchAndFilter);
}

window.onload = setup;
