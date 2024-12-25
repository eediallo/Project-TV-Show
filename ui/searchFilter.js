import { render } from "./render.js";
import { searchInput, episodeSelector, displayNumber } from "./domElements.js";
import { state } from "../data/state.js";

function handleSearchAndFilter() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedEpisode = episodeSelector.value.toLowerCase();
  state.searchTerm =
    selectedEpisode === "all-episode" ? searchTerm : selectedEpisode;

  const filteredEpisodes = state.allEpisodes.filter((episode) => {
    const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
    return episodeText.includes(state.searchTerm);
  });

  render(filteredEpisodes);
  displayNumber.textContent = `${filteredEpisodes.length} / ${
    state.allEpisodes.length
  } episode${filteredEpisodes.length !== 1 ? "s" : ""}`;
}

export { handleSearchAndFilter };
