function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  const episodeList =  allEpisodes.map(createEpisodeCard)
  rootElem.append(...episodeList)
}

function formatSeason(season){
  return season  < 10 ? `S0${season}` : `S${season}`
}

function formatEpisode(episode){
  return episode  < 10 ? `E0${episode}` : `E${episode}`
}

function createEpisodeCard(episode){
  const episodeCard = document.querySelector('#episode-card-template').content.cloneNode(true)
  episodeCard.querySelector('h3').textContent = episode.name
  episodeCard.querySelector('[data-season-episode]').textContent = `${formatSeason(episode.season)}${formatEpisode(episode.number)}`
  episodeCard.querySelector('img').setAttribute('src', episode.image.medium)
  episodeCard.querySelector('p').textContent = episode.summary.replace(/<p>|<\/p>/g, '')
  return episodeCard  
}

window.onload = setup;
