import { renderShowsOptions } from "../ui/shows/showOption.js";
import { getShows } from "../data/getShows.js";
import { render } from "../ui/render.js";
import { state } from "../data/state.js";
import {
  episodeDropDown,
  showDropDown,
  backToShowsBtn,
  showSelector,
} from "../ui/domElements.js";
import { createShowCard } from "../ui/shows/createShowCard.js";

async function handleBackToShows() {
  episodeDropDown.style.display = "none";
  showDropDown.style.display = "block";
  backToShowsBtn.style.display = "none";
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  showSelector.value = "all-shows";
}

export { handleBackToShows };
