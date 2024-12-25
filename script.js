import { getShows } from "./data/getShows.js";
// import {
//   searchInput,
//   episodeSelector,
//   showSelector,
//   episodeDropDown,
//   showDropDown,
//   backToShowsBtn,
// } from "./ui/domElements.js";
import { state } from "./data/state.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/render.js";

import { createShowCard } from "./ui/shows/createShowCard.js";
import { addEventListeners } from "./ui/eventHandlers/events.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  addEventListeners();
}

window.onload = setup;
