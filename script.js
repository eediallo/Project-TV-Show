function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
}

const oneEpisode = getOneEpisode();

function createEpisodeCard(){
  const episodeCard = document.querySelector('#episode-card-template').content.cloneNode(true)
  episodeCard.querySelector('h3').textContent = oneEpisode.name
  episodeCard.querySelector('[data-season-number]').textContent = oneEpisode.season
  episodeCard.querySelector('[data-episode-number]').textContent = oneEpisode.number
  episodeCard.querySelector('img').setAttribute('src', oneEpisode.image.medium)
  episodeCard.querySelector('p').textContent = oneEpisode.summary.replace(/<p>|<\/p>/g, '')
  return episodeCard  
}

const rootElem = document.getElementById("root");
const episodeCard = createEpisodeCard()
rootElem.appendChild(episodeCard)




console.log(episodeCard)
window.onload = setup;
