import { showSeletor } from "../js/domElements.js";

function createShowOption(show) {
  const showOption = document.createElement("option");
  showOption.value = show.id;
  showOption.textContent = `${show.id} - ${show.name}`;
  return showOption;
}

function renderShows(shows) {
  const showOptions = shows.map(createShowOption);
  showSeletor.append(...showOptions);
}

export { renderShows };
