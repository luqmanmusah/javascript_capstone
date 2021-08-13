/* eslint-disable quotes */
import Movies from './movies';
import './style.css';
import counter from './counter';
// import logo_iflix from "./logo_iflix.png"
const likeUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/likes/';
const navCount = document.getElementById('nav-count');
const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/oFkkXhh8ZCM14YoilhgC/comments';
const myMovies = new Movies();

const modalFnc = async (id) => {
  const myModal = document.getElementById('myModal');
  const modalContent = document.getElementById('modalContent');
  const getMovie = await myMovies.getMovie(id);
  const getComments = async () => {
    const request = await fetch(`${commentUrl}?item_id=${id}`);
    let data = [];

    data = await request.json();
    return data;
  };
  modalContent.innerHTML = `<div class="close-icon"><span class="close">&times;</span></div>
  <div class="movie-section">
  <div class="movie-head">
    <img src='${getMovie.image.original}' class="movie-modal-img" width='200px' alt=''/>
    <h2>${getMovie.name}</h2>
  </div>
  <div class="movie-desc">${getMovie.summary}</div>
  </div>
  <div class="movie-infos">
    <div class="movie-info">
      <p>rating:</p> <p>${getMovie.rating.average}</p>
    </div>
    <div class="movie-info">
      <p>status:</p> <p>${getMovie.status}</p>
    </div>
    <div class="movie-info">
      <p>type:</p> <p>${getMovie.type}</p>
    </div>
  </div>
   <h2 id="commentCount"></h2>
    <ul id="commentUl">
    
    </ul>
    <h3>Add a Comment</h3>

    <form id="myForm" action="" onsubmit="postComment">
    <input type="text" class="form-input" name="fname" id="username" placeholder="Your name"><br>
    <textarea name="lname" class="form-input" id="insight" cols="10" rows="5"></textarea><br>
    <input type="submit" class="submit" value="Submit" id="submit">
    </form>
  `;

  const commentUl = document.getElementById('commentUl');
  let commentList = [];

  const getCommentList = async () => {
    commentList = await getComments();
    if (commentList.error) {
      commentList = [];
    }
  };

  await getCommentList();

  const drawComments = async () => {
    await getCommentList();
    const liToRemove = document.querySelectorAll('#commentUl li');
    liToRemove.forEach((item) => {
      item.remove();
    });
    commentList.forEach((comment) => {
      const li = document.createElement('li');
      li.classList.add('commentLi');
      li.innerHTML = ` ${comment.username}: ${comment.creation_date} ${comment.comment}`;
      commentUl.appendChild(li);
    });
  };
  await drawComments();

  const commentCount = document.getElementById('commentCount');
  let counted = counter();
  commentCount.innerHTML = `Comment(${counted})`;

  const submit = document.getElementById('submit');
  submit.onclick = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username');
    const insight = document.getElementById('insight');

    const user = {
      item_id: `${id}`,
      username: `${username.value}`,
      comment: `${insight.value}`,
    };
    await fetch(commentUrl, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    await getCommentList();
    await drawComments();
    counted = counter();
    commentCount.innerHTML = `Comment(${counted})`;
  };

  myModal.appendChild(modalContent);
  myModal.style.display = 'block';

  const span = document.getElementsByClassName("close")[0];

  span.onclick = () => {
    myModal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === myModal) {
      myModal.style.display = "none";
    }
  };
};

const drawMovies = (movies) => {
  const moviesUl = document.getElementById('movies');
  const liToRemove = document.querySelectorAll('#movies li');
  liToRemove.forEach((item) => {
    item.remove();
  });
  movies.forEach((movie, id) => {
    const li = document.createElement('li');
    li.classList.add('movie');
    li.id = `li${movie.id}`;
    li.innerHTML = `<img src="${movie.image.medium}" class="movie-img" alt="${movie.name}">`
    + `<div class="movie-name-section"><p> ${movie.name}</p><i class="likeBtn fa fa-heart-o" id="${movie.id}" style="font-size:24px"></i></div>`
    + `<div class="like-div"><p class="likes" id="like${movie.id}">${movie.likes}</p><p> Likes</p></div>`
    + `<button id="comment${id}" class="commentBtn">Comments</button><br>`;
    moviesUl.appendChild(li);
    document.getElementById(`comment${id}`).onclick = () => modalFnc(movie.id);
    const likeBtn = document.getElementById(movie.id);
    likeBtn.addEventListener('click', async () => {
      const params = {
        item_id: `${movie.id}`,
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
      await fetch(likeUrl, options).then((response) => response.status);
      const likeTag = document.getElementById(`like${movie.id}`);
      const likeNum = parseInt(likeTag.innerHTML);
      likeTag.innerHTML = likeNum + 1;
    });
  });
};

const countMovies = async (film, target) => {
  const numMovies = film.length;
  target.innerHTML = `Movies(${numMovies})`;
};

const init = async () => {
  await myMovies.getMovies();
  countMovies(myMovies.movieList, navCount);
  drawMovies(myMovies.movieList);
};

// eslint-disable-next-line no-restricted-globals
onload = init();
