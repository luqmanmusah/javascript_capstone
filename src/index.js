import Movies from './movies';
import './style.css';
// import logo_iflix from "./logo_iflix.png"
// const request = new XMLHttpRequest();
const myMovies = new Movies();

const drawMovies = (movies) => {
  const moviesUl = document.getElementById('movies');
  const liToRemove = document.querySelectorAll('#movies li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.classList.add('movie');
    li.innerHTML = `<img src="${movie.image.medium}" class="movie-img" alt="${movie.name}">`
    + `<div class="movie-name-section"><p> ${movie.name}</p><i class="fa fa-heart-o" style="font-size:24px"></i></div>`
    + `<p class="likes" id="${movie.id}">5 Likes</p>`
    + '<button>Comments</button><br>';
    moviesUl.appendChild(li);
  });
};

const init = async () => {
  await myMovies.getMovies();
  drawMovies(myMovies.movieList);
};
/* eslint-disabled */
onload = init();
/* eslint-enabled */
setTimeout(() => {
  console.log(myMovies.movieList);
}, 10000);