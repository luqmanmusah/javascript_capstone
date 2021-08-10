const request = new XMLHttpRequest();
const baseUrl = 'https://api.tvmaze.com/shows';

export default class Movies {
  constructor() {
    this.movieList = [];
  }

  async getMovie(id) {
    console.log('sdfsdf');
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
    console.log(JSON.parse(await moviePromis));
    return JSON.parse(await moviePromis);
  }

  async getMovies() {
    for (let i = 0; i < 6; i++) {
      let film = await this.getMovie(i + 1)
      this.movieList[i] = film;
    }
  }
}