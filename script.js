import { getShows } from "./js/getShows.js";
import {
  searchInput,
  displayNumber,
  episodeSelector,
  showSeletor,
} from "./ui/domElements.js";
import { state } from "./js/state.js";
import { getEpisodeData } from "./js/getEpisode.js";
import { renderShows } from "./ui/showOption.js";
import { renderEpisodes } from "./ui/episodes/renderEpisodes.js";
import { renderEpisodeOptions } from "./ui/episodes/renderEpisodeOption.js";

function messageForUser(message, parentEl, id) {
  const pElement = document.createElement("p");
  pElement.textContent = message;
  pElement.setAttribute("id", id);
  parentEl.appendChild(pElement);
}

async function setup() {
  await getShows();
  renderShows(state.allShows);

  await getEpisodeData(1);
  renderEpisodes(state.allEpisodes);
  renderEpisodeOptions(state.allEpisodes);
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

function handleSearchAndFilter() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedEpisode = episodeSelector.value.toLowerCase();
  state.searchTerm =
    selectedEpisode === "all-episode" ? searchTerm : selectedEpisode;

  const filteredEpisodes = state.allEpisodes.filter((episode) => {
    const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
    return episodeText.includes(state.searchTerm);
  });

  renderEpisodes(filteredEpisodes);
  displayNumber.textContent = `${filteredEpisodes.length} / ${
    state.allEpisodes.length
  } episode${filteredEpisodes.length !== 1 ? "s" : ""}`;
}

function formatSeasonEpisode(seasonOrEpisode, type) {
  const prefix = type === "season" ? "S" : "E";
  return seasonOrEpisode < 10
    ? `${prefix}0${seasonOrEpisode}`
    : `${prefix}${seasonOrEpisode}`;
}

export { formatSeasonEpisode };
window.onload = setup;
