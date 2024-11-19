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

const oneEpisode = getOneEpisode();

function createEpisodeCard(){
  const episodeCard = document.querySelector('#episode-card-template').content.cloneNode(true)
  episodeCard.querySelector('h3').textContent = oneEpisode.name
  episodeCard.querySelector('[data-season-number]').textContent = formatSeason(oneEpisode.season)
  episodeCard.querySelector('[data-episode-number]').textContent = formatEpisode(oneEpisode.number)
  episodeCard.querySelector('img').setAttribute('src', oneEpisode.image.medium)
  episodeCard.querySelector('p').textContent = oneEpisode.summary.replace(/<p>|<\/p>/g, '')
  return episodeCard  
}

const rootElem = document.getElementById("root");
const episodeCard = createEpisodeCard()
rootElem.appendChild(episodeCard)




console.log(episodeCard)
window.onload = setup;
