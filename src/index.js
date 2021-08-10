import Movies from "./movies";
import "./style.css";
const request = new XMLHttpRequest();
const myMovies = new Movies();

const drawMovies = (movies) => {
  const movies_ul = document.getElementById('movies');
  const liToRemove = document.querySelectorAll('#movies li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.classList.add('movie');
    li.innerHTML = 
    `<img src="${movie.image.medium}" class="movie-img" alt="${movie.name}">`
    + `<div class="movie-name-section"><p> ${movie.name}</p><i class="fa fa-heart-o" style="font-size:24px"></i></div>`
    + `<p class="likes">5 Likes</p>`
    + `<button>Comments</button><br>`
    + `<button>Reservations</button>`;
    movies_ul.appendChild(li);
  });
};

const init = async () => {
  await myMovies.getMovies();
  drawMovies(myMovies.movieList);
}

onload = init();


setTimeout(() => {
  console.log(myMovies.movieList);
}, 10000);