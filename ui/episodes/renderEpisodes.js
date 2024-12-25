import { createEpisodeCard } from "./createEpisodeCard.js";
import { rootElement } from "../domElements.js";

function render(episodes) {
  rootElement.innerHTML = "";
  const episodeCards = episodes.map(createEpisodeCard);
  rootElement.append(...episodeCards);
}

export { render };
