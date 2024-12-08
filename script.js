const input = document.getElementById("search-input");
const displayNumber = document.getElementById("display-number");
const episodeSelector = document.querySelector("#episode-selector");

const state = {
  allEpisodes: getAllEpisodes(),
  searchTerm: "",
};

function setup() {
  const allEpisodes = state.allEpisodes;
  render(allEpisodes, "#root", createEpisodeCard);
  searchEpisodeCards();
  createEpisodeDropDownSelector(allEpisodes);
}

function render(allEpisodes, elementSelector, createdElements) {
  const element = document.querySelector(elementSelector);
  const elementCreatedList = allEpisodes.map(createdElements);
  element.append(...elementCreatedList);
}

function formatSeasonEpisode(seasonOrEpisode, type) {
  const prefix = type === "season" ? "S" : "E";
  return seasonOrEpisode < 10
    ? `${prefix}0${seasonOrEpisode}`
    : `${prefix}${seasonOrEpisode}`;
}

function createEpisodeCard(episode) {
  const episodeCard = document
    .querySelector("#episode-card-template")
    .content.cloneNode(true);
  episodeCard.querySelector("h1").textContent = episode.name;
  episodeCard.querySelector(
    "[data-season-episode]"
  ).textContent = `- ${formatSeasonEpisode(
    episode.season,
    "season"
  )}${formatSeasonEpisode(episode.number)}`;
  episodeCard.querySelector("img").setAttribute("src", episode.image.medium);
  episodeCard.querySelector("p").textContent = episode.summary.replace(
    /<p>|<\/p>/g,
    ""
  );
  return episodeCard;
}

function searchEpisodeCards() {
  input.addEventListener("input", (e) => {
    renderMatchingEpisodes(e);
  });
}

function renderMatchingEpisodes(e) {
  state.searchTerm = e.target.value.toLowerCase();
  let countShownEpisodes = 0;
  const cards = document.querySelectorAll(".episode-card");
  cards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    if (cardText.includes(state.searchTerm)) {
      card.classList.remove("hidden");
      countShownEpisodes += 1;
    } else {
      card.classList.add("hidden");
    }
  });

  displayNumber.textContent = `${countShownEpisodes} / 73 episode${
    countShownEpisodes !== 1 ? "s" : ""
  } `;
}

function createEpisodeDropDownSelector(episode) {
  const episodeOption = document.createElement("option");
  episodeOption.value = episode.name;
  const formattedSeason = formatSeasonEpisode(episode.season, "season");
  const formattedEpisode = formatSeasonEpisode(episode.number);
  const episodeName = episode.name;
  episodeOption.textContent = `${formattedSeason}${formattedEpisode} - ${episodeName}`;

  return episodeOption;
}

// display all episode in the drop down menu
render(state.allEpisodes, "#episode-selector", createEpisodeDropDownSelector);

window.onload = setup;
