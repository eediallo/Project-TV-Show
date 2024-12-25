import { formatSeasonEpisode } from "../formatSeasonEpi.js";

function createEpisodeOption(episode) {
  const episodeOption = document.createElement("option");
  episodeOption.value = episode.name;
  const formattedSeason = formatSeasonEpisode(episode.season, "season");
  const formattedEpisode = formatSeasonEpisode(episode.number);
  episodeOption.textContent = `${formattedSeason}${formattedEpisode} - ${episode.name}`;
  return episodeOption;
}

export { createEpisodeOption };
