import { createEpisodeCard } from "./createEpisodeCard.js";
import { rootElement } from "../domElements.js";

function renderEpisodes(episodes) {
  rootElement.innerHTML = "";
  const episodeCards = episodes.map(createEpisodeCard);
  rootElement.append(...episodeCards);
}

export { renderEpisodes };
