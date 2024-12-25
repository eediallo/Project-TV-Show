import { formatSeasonEpisode } from "../formatSeasonEpi.js";

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

export { createEpisodeCard };
