import { render } from "./render.js";
import { searchInput, episodeSelector, displayNumber } from "./domElements.js";
import { state } from "../data/state.js";

function handleSearchAndFilter(showsOrEpisodes, createCard) {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedEpisodeOrShow = episodeSelector.value.toLowerCase();
  state.searchTerm =
    selectedEpisodeOrShow === "all-episode"
      ? searchTerm
      : selectedEpisodeOrShow;

  const filteredEpisodesOrShows = showsOrEpisodes.filter((episodeOrShow) => {
    const episodeOrShowText =
      `${episodeOrShow.name} ${episodeOrShow.summary}`.toLowerCase();
    return episodeOrShowText.includes(state.searchTerm);
  });

  render(filteredEpisodesOrShows, createCard);
  displayNumber.textContent = `${filteredEpisodesOrShows.length} / ${
    showsOrEpisodes.length
  } episode${filteredEpisodesOrShows.length !== 1 ? "s" : ""}`;
}

export { handleSearchAndFilter };
