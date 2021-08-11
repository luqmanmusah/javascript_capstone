/*eslint-disable*/
const request = new XMLHttpRequest();
const baseUrl = 'https://api.tvmaze.com/shows';
const likeUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/likes/';

export default class Movies {
  constructor() {
    this.movieList = [];
  }

  async getMovie(id) {
    const oneMovieUrl = `${baseUrl}/${id}`;
    const moviePromis = new Promise((myResolve) => {
      request.open('GET', oneMovieUrl);
      request.onload = () => {
        if (request.status === 200) {
          myResolve(request.response);
        } else {
          myResolve('Error');
        }
      };
      request.send();
    });
    return JSON.parse(await moviePromis);
  }

  async getLikes() {
    const likePromis = new Promise((myResolve) => {
      request.open('GET', likeUrl);
      request.onload = () => {
        if (request.status === 200) {
          myResolve(request.response);
        } else {
          myResolve('Error');
        }
      };
      request.send();
    });
    return JSON.parse(await likePromis);
  }

  async getMovies() {
    const likesList = await this.getLikes();
    for (let i = 0; i < 6; i += 1) {
      const film = await this.getMovie(i + 5);
      this.movieList[i] = film;
      this.movieList[i].likes = 0
    }
    likesList.forEach(like => {
      let i = parseInt(like.item_id);
      this.movieList.forEach(movie => {
        if (movie.id === i) {
          movie.likes = like.likes;
        }
      })
    });
  }
}