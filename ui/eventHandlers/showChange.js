import { getEpisodeData } from "../../data/getEpisode.js";
import {
  episodeDropDown,
  backToShowsBtn,
  showDropDown,
} from "../domElements.js";
import { state } from "../../data/state.js";
import { renderEpisodeOptions } from "../episodes/renderEpisodeOption.js";
import { render } from "../render.js";
import { createEpisodeCard } from "../episodes/createEpisodeCard.js";

async function handleShowChange(e) {
  await getEpisodeData(e.target.value);

  episodeDropDown.style.display = "block";
  backToShowsBtn.style.display = "block";
  showDropDown.style.display = "none";

  renderEpisodeOptions(state.allEpisodes);
  render(state.allEpisodes, createEpisodeCard);
}

export { handleShowChange };
