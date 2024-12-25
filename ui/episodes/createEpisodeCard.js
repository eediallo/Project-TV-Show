import { formatSeasonEpisode } from "../formatSeasonEpi.js";

function createEpisodeCard(episode) {
  const episodeCard = document.createElement("section");
  episodeCard.classList.add("episode-card");

  const header = document.createElement("div");
  header.classList.add("header");

  const h1 = document.createElement("h1");
  h1.textContent = episode.name;

  const data = document.createElement("data");
  data.setAttribute("data-season-episode", "");
  data.textContent = `- ${formatSeasonEpisode(
    episode.season,
    "season"
  )}${formatSeasonEpisode(episode.number)}`;

  header.appendChild(h1);
  header.appendChild(data);

  const content = document.createElement("div");
  content.classList.add("content");

  const episodeImg = document.createElement("div");
  episodeImg.classList.add("episode-img");

  const img = document.createElement("img");
  img.setAttribute("src", episode.image.medium);
  img.setAttribute("alt", "episode image");

  episodeImg.appendChild(img);

  const summary = document.createElement("p");
  summary.classList.add("summary");
  summary.innerHTML = episode.summary.replace(/<p>|<\/p>/g, "");

  content.append(episodeImg, summary);
  episodeCard.append(header, content);

  return episodeCard;
}

export { createEpisodeCard };
