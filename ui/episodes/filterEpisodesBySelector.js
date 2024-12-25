import { episodeSelector } from "../domElements.js";
import { state } from "../../data/state.js";
import { createEpisodeCard } from "./createEpisodeCard.js";
import { render } from "../render.js";

function filterEpisodesBySelector() {
  let filteredEpisodes = [];
  const selectedEpisode = episodeSelector.value.toLowerCase();
  filteredEpisodes.push(
    ...state.allEpisodes.filter((episode) => {
      const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
      return episodeText.includes(selectedEpisode);
    })
  );
  render(filteredEpisodes, createEpisodeCard);
}

export { filterEpisodesBySelector };
