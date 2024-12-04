function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchEpisodeCards();
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  const episodeList = allEpisodes.map(createEpisodeCard);
  rootElem.append(...episodeList);
}

function formatSeason(season) {
  return season < 10 ? `S0${season}` : `S${season}`;
}

function formatEpisode(episode) {
  return episode < 10 ? `E0${episode}` : `E${episode}`;
}

function createEpisodeCard(episode) {
  const episodeCard = document
    .querySelector("#episode-card-template")
    .content.cloneNode(true);
  episodeCard.querySelector("h1").textContent = episode.name;
  episodeCard.querySelector(
    "[data-season-episode]"
  ).textContent = `- ${formatSeason(episode.season)}${formatEpisode(
    episode.number
  )}`;
  episodeCard.querySelector("img").setAttribute("src", episode.image.medium);
  episodeCard.querySelector("p").textContent = episode.summary.replace(
    /<p>|<\/p>/g,
    ""
  );
  return episodeCard;
}

function searchEpisodeCards() {
  const input = document.getElementById("search-input");
  const cards = document.querySelectorAll(".episode-card");
  const displayNumber = document.getElementById("display-number");

  input.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    let countShownEpisodes = 0;

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
  });
}
window.onload = setup;
