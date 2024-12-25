function formatSeasonEpisode(seasonOrEpisode, type) {
  const prefix = type === "season" ? "S" : "E";
  return seasonOrEpisode < 10
    ? `${prefix}0${seasonOrEpisode}`
    : `${prefix}${seasonOrEpisode}`;
}

export { formatSeasonEpisode };
