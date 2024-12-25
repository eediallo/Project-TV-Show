function createShowCard(show) {
  console.log(show);
  const showCard = document.createElement("section");
  showCard.classList.add("show-card");

  const header = document.createElement("div");
  header.classList.add("header");

  const name = document.createElement("h1");
  name.textContent = show.name;

  header.append(name);

  const content = document.createElement("div");
  content.classList.add("content");

  const imgDiv = document.createElement("div");

  const img = new Image();
  img.setAttribute("src", show.image.medium);

  const summary = document.createElement("p");
  summary.classList.add("summary");
  summary.innerHTML = show.summary.replace("/<p>/g", "");

  const genresStatusRuntimeRating = document.createElement("div");
  genresStatusRuntimeRating.classList.add("details");

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${show.rating.average}`;

  const genres = document.createElement("p");
  genres.textContent = `Genres: ${show.genres[0]} | ${show.genres[1]} `;

  const status = document.createElement("p");
  status.textContent = `Status: ${show.status}`;

  const runtime = document.createElement("p");
  runtime.textContent = `Runtime: ${show.runtime}`;

  imgDiv.append(img);
  genresStatusRuntimeRating.append(rating, genres, status, runtime);

  content.append(imgDiv, summary, genresStatusRuntimeRating);
  showCard.append(header, content);

  return showCard;
}

export { createShowCard };
