import { getEpisodeData } from "../data/getEpisode.js";
import {
  episodeDropDown,
  backToShowsBtn,
  showDropDown,
} from "../ui/domElements.js";
import { state } from "../data/state.js";
import { renderEpisodeOptions } from "../ui/episodes/renderEpisodeOption.js";
import { render } from "../ui/render.js";
import { createEpisodeCard } from "../ui/episodes/createEpisodeCard.js";

async function handleShowChange(e) {
  await getEpisodeData(e.target.value);

  episodeDropDown.style.display = "block";
  backToShowsBtn.style.display = "block";
  showDropDown.style.display = "none";

  renderEpisodeOptions(state.allEpisodes);
  render(state.allEpisodes, createEpisodeCard);
}

export { handleShowChange };
