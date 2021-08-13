/* eslint-disable class-methods-use-this */
const request = new XMLHttpRequest();
const baseUrl = 'https://api.tvmaze.com/shows';
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

  async getMovies() {
    for (let i = 0; i < 6; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const film = await this.getMovie(i + 1);
      this.movieList[i] = film;
    }
  }
}