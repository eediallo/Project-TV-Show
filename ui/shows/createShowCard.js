function createShowCard(show) {
  const showCard = document.createElement("section");
  const name = document.createElement("h1");
  name.textContent = show.name;
  const img = new Image();
  img.setAttribute("src", show.image.medium);
  const summary = document.createElement("p");
  summary.textContent = show.summary;

  const genres = document.createElement("p");
  genres.textContent = `Genres: ${show.genres[0]} | ${show.genres[1]} `;

  const status = document.createElement("p");
  status.textContent = `Status: ${show.status}`;

  const runtime = document.createElement("p");
  runtime.textContent = `Runtime: ${show.runtime}`;

  showCard.append(name, img, summary, genres, status, runtime);

  return showCard;
}

export { createShowCard };
