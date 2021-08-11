import Movies from './movies';
import './style.css';
// import logo_iflix from "./logo_iflix.png"
const request = new XMLHttpRequest();
const likeUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/likes/';
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
    + `<div class="movie-name-section"><p> ${movie.name}</p><i class="likeBtn fa fa-heart-o" id="${movie.id}" style="font-size:24px"></i></div>`
    + `<p class="likes">${movie.likes} Likes</p>`
    + '<button>Comments</button><br>';
    moviesUl.appendChild(li);
    const likeBtn = document.getElementById(movie.id);
    likeBtn.addEventListener('click', () => {
      const params = `item_id=${movie.id}`;
      request.open('POST', likeUrl, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          alert(request.responseText);
        }
      };
      request.send(params);
    });

  });
};

const init = async () => {
  await myMovies.getMovies();
  drawMovies(myMovies.movieList);
};
/*eslint-disable*/
onload = init();
/* eslint-enable */
setTimeout(() => {
  console.log(myMovies.movieList);
}, 10000);