const input = document.getElementById("search-input");
const displayNumber = document.getElementById("display-number");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisodeCards();
  createEpisodeDropDownSelector(allEpisodes);
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  const episodeList = allEpisodes.map(createEpisodeCard);
  rootElem.append(...episodeList);
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
    episode.season
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
    renderSelectedEpisodes(e);
  });
}

function renderSelectedEpisodes(e) {
  const searchText = e.target.value.toLowerCase();
  let countShownEpisodes = 0;

  const cards = document.querySelectorAll(".episode-card");

  cards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();

    if (cardText.includes(searchText)) {
      card.style.display = "block";
      countShownEpisodes += 1;
    } else {
      card.style.display = "none";
    }
  });

  displayNumber.textContent = `${countShownEpisodes} / 73 episode${
    countShownEpisodes !== 1 ? "s" : ""
  } `;
}

function createEpisodeDropDownSelector(allEpisodes) {
  const episodeSelectorTemplate = document.querySelector(
    "#episode-selector-temp"
  );
  const episodeSelectorTemplateClone =
    episodeSelectorTemplate.content.cloneNode(true);
  document.body.insertBefore(
    episodeSelectorTemplateClone,
    document.querySelector(".search-panel")
  );

  const episodeSelector = document.querySelector("#episode-selector");

  episodeSelector.append(
    ...allEpisodes.map((episode) => {
      const episodeOption = document.createElement("option");
      episodeOption.value = episode.name;
      const formattedSeason = `S${formatSeasonEpisode(episode.season)}`;
      const formattedEpisode = `E${formatSeasonEpisode(episode.number)}`;
      const episodeName = episode.name;
      episodeOption.textContent = `${formattedSeason}${formattedEpisode} - ${episodeName}`;
      episodeOption.classList.add("episode-option");

      return episodeOption;
    })
  );
  episodeSelector.addEventListener("change", (event) => {
    renderSelectedEpisodes(event);
  });
}

window.onload = setup;
