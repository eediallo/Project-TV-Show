import { createEpisodeOption } from "./createEpisodeOption.js";

function renderEpisodeOptions(episodes) {
  const episodeSelector = document.getElementById("episode-selector");
  episodeSelector.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all-episodes";
  allOption.textContent = "All Episodes";
  episodeSelector.appendChild(allOption);

  const episodeOptions = episodes.map(createEpisodeOption);
  episodeSelector.append(...episodeOptions);
}

export { renderEpisodeOptions };
