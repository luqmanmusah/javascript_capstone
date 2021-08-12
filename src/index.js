import Alert from 'bootstrap/js/dist/alert';
import Movies from "./movies";
import "./style.css";
const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/comments/';
// import logo from './logo_iflix.png';

const request = new XMLHttpRequest();
const myMovies = new Movies();

// const img = document.querySelector('nav_logo');
// console.log(img, "logo");

const drawMovies = (movies) => {
  const movies_ul = document.getElementById('movies');
  const liToRemove = document.querySelectorAll('#movies li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  movies.forEach((movie, id) => {
    const li = document.createElement('li');
    li.classList.add('movie');
    li.innerHTML = `<img src="${movie.image.medium}" class="movie-img" alt="${movie.name}">`
    + `<div class="movie-name-section"><p> ${movie.name}</p><i class="fa fa-heart-o" style="font-size:24px"></i></div>`
    + '<p class="likes">5 Likes</p>'
    + `<button id="comment${id}">Comments</button><br>`;

    movies_ul.appendChild(li);
    document.getElementById(`comment${id}`).onclick = () => modalFnc(movie.id);
  });
};
const modalFnc = async(id) => {
  const myModal = document.getElementById('myModal');
  const modalContent = document.getElementById('modalContent');
  const getMovie = await myMovies.getMovie(id);
  const payload = {
    item_id: id,
    username: ""
  }
  // const sendComment = await myMovies.sendComment()
  console.log(getMovie, 'get movie here');
  modalContent.innerHTML = `
    <img src='${getMovie.image.original}' width='200px' alt=''/>
    ${getMovie.summary}

    <h3>Comment</h3>

    <form id="myForm" action="" onsubmit="`postComment`">
      <input type="text" name="fname" id="username" placeholder="Your name"><br>
      <textarea name="lname" id="insight" cols="30" rows="10"></textarea><br>
      <input type="submit" value="Submit">
    </form>
  `
  // movies.forEach((movie, id) => {
  //   const li = document.createElement('li');
  //   li.classList.add('movies');
  //   li.innerHTML = `<img src="${movie.image.large}" class="movie-img" alt="${movie.name}">`

  myModal.appendChild(modalContent);
  myModal.style.display = 'block';
};


const init = async () => {
  await myMovies.getMovies();
  drawMovies(myMovies.movieList);
}

onload = init();


setTimeout(() => {
  console.log(myMovies.movieList);
}, 10000);