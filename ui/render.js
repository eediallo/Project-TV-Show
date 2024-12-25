import { rootElement } from "./domElements.js";

function render(showsOrEpisodes, createCard) {
  rootElement.innerHTML = "";
  const cards = showsOrEpisodes.map(createCard);
  rootElement.append(...cards);
}

export { render };
