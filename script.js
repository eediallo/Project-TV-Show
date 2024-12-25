import { getShows } from "./js/shows.js";
import {
  searchInput,
  displayNumber,
  episodeSelector,
  showSeletor,
  rootElement,
} from "./js/domElements.js";
import { state } from "./js/state.js";

function messageForUser(message, parentEl, id) {
  const pElement = document.createElement("p");
  pElement.textContent = message;
  pElement.setAttribute("id", id);
  parentEl.appendChild(pElement);
}

async function getEpisodesData(id) {
  if (state.isLoading) {
    console.warn("Fetch already in progress. Please wait.");
    return;
  }
  const url = `https://api.tvmaze.com/shows/${id}/episodes`;
  messageForUser(
    "Please wait while episodes data finish loading...",
    rootElement,
    "loadMsg"
  );
  try {
    state.isLoading = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const episodes = await response.json();
    state.allEpisodes = episodes; // update allEpisodes in state
  } catch (error) {
    console.error(error.message);
    messageForUser(
      "Episodes failed to load, please refresh the page.",
      document.body,
      "errLoadMsg"
    );
    document.body.appendChild(errorMessage);
  } finally {
    state.isLoading = false;
    if (state.isLoading) {
      loadingMessage.remove();
    }
  }
}

async function setup() {
  await getShows();
  renderShows(state.allShows);

  await getEpisodesData(1);
  renderEpisodes(state.allEpisodes);
  renderEpisodeOptions(state.allEpisodes);
  addEventListeners();
}

// ==================== Shows ==================================================

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

showSeletor.addEventListener("change", async (e) => {
  await getEpisodesData(e.target.value);
  renderEpisodes(state.allEpisodes);
  renderEpisodeOptions(state.allEpisodes);
});
// ====================== Episodes =============================================

function renderEpisodes(episodes) {
  rootElement.innerHTML = "";
  const episodeCards = episodes.map(createEpisodeCard);
  rootElement.append(...episodeCards);
}

function renderEpisodeOptions(episodes) {
  const episodeSelector = document.getElementById("episode-selector");
  episodeSelector.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all-episode";
  allOption.textContent = "All Episodes";
  episodeSelector.appendChild(allOption);

  const episodeOptions = episodes.map(createEpisodeOption);
  episodeSelector.append(...episodeOptions);
}

function addEventListeners() {
  searchInput.addEventListener("input", handleSearchAndFilter);
  episodeSelector.addEventListener("change", handleSearchAndFilter);
}

function handleSearchAndFilter() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedEpisode = episodeSelector.value.toLowerCase();
  state.searchTerm =
    selectedEpisode === "all-episode" ? searchTerm : selectedEpisode;

  const filteredEpisodes = state.allEpisodes.filter((episode) => {
    const episodeText = `${episode.name} ${episode.summary}`.toLowerCase();
    return episodeText.includes(state.searchTerm);
  });

  renderEpisodes(filteredEpisodes);
  displayNumber.textContent = `${filteredEpisodes.length} / ${
    state.allEpisodes.length
  } episode${filteredEpisodes.length !== 1 ? "s" : ""}`;
}

function createEpisodeCard(episode) {
  const episodeCard = document.createElement("section");
  episodeCard.classList.add("episode-card");

  const episodeTitle = document.createElement("div");
  episodeTitle.classList.add("episode-title");

  const h1 = document.createElement("h1");
  h1.textContent = episode.name;

  const data = document.createElement("data");
  data.setAttribute("data-season-episode", "");
  data.textContent = `- ${formatSeasonEpisode(
    episode.season,
    "season"
  )}${formatSeasonEpisode(episode.number)}`;

  episodeTitle.appendChild(h1);
  episodeTitle.appendChild(data);

  const episodeImg = document.createElement("div");
  episodeImg.classList.add("episode-img");

  const img = document.createElement("img");
  img.setAttribute("src", episode.image.medium);
  img.setAttribute("alt", "episode image");

  episodeImg.appendChild(img);

  const p = document.createElement("p");
  p.innerHTML = episode.summary.replace(/<p>|<\/p>/g, "");

  episodeCard.appendChild(episodeTitle);
  episodeCard.appendChild(episodeImg);
  episodeCard.appendChild(p);

  return episodeCard;
}

function createEpisodeOption(episode) {
  const episodeOption = document.createElement("option");
  episodeOption.value = episode.name;
  const formattedSeason = formatSeasonEpisode(episode.season, "season");
  const formattedEpisode = formatSeasonEpisode(episode.number);
  episodeOption.textContent = `${formattedSeason}${formattedEpisode} - ${episode.name}`;
  return episodeOption;
}

function formatSeasonEpisode(seasonOrEpisode, type) {
  const prefix = type === "season" ? "S" : "E";
  return seasonOrEpisode < 10
    ? `${prefix}0${seasonOrEpisode}`
    : `${prefix}${seasonOrEpisode}`;
}

window.onload = setup;
