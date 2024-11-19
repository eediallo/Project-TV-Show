function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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
  episodeCard.querySelector('[data-season-number]').textContent = formatSeason(episode.season)
  episodeCard.querySelector('[data-episode-number]').textContent = formatEpisode(episode.number)
  episodeCard.querySelector('img').setAttribute('src', episode.image.medium)
  episodeCard.querySelector('p').textContent = episode.summary.replace(/<p>|<\/p>/g, '')
  return episodeCard  
}

const allEpisodes = getAllEpisodes()

for(let episode of allEpisodes){
const episodeCard = createEpisodeCard(episode)
const rootElem = document.getElementById("root");
rootElem.appendChild(episodeCard)
}


window.onload = setup;
