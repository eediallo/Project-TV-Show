import { getShows } from "./data/getShows.js";
import { state } from "./data/state.js";
import { renderShowsOptions } from "./ui/shows/showOption.js";
import { render } from "./ui/render.js";

import { createShowCard } from "./ui/shows/createShowCard.js";
import { addEventListeners } from "./handlers/events.js";

async function setup() {
  await getShows();
  renderShowsOptions(state.allShows);
  render(state.allShows, createShowCard);
  addEventListeners();
}

window.onload = setup;
