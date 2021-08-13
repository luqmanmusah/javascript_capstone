const request = new XMLHttpRequest();
const baseUrl = 'https://api.tvmaze.com/shows';
const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/comments/';
export default class Movies {
  constructor() {
    this.movieList = [];
  }

  async getMovie(id){
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
      let film = await this.getMovie(i + 1);
      this.movieList[i] = film;
    }
  }

  // const getComments = async () => {
  //   const request = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JSE0hSFAswxrC4wkDks7/comments/');
  //   const data = await request.json();
  //   return data;
  // };
  // async getComments() {
  //   const commentPromise = new Promise((myResolve) => {
  //     request.open('GET', commentUrl);
  //     request.onload = () => {
  //       if (request.status === 200) {
  //         myResolve(request.response);
  //       } else {
  //         myResolve('Error');
  //       }
  //     };
  //     request.send();
  //   });
  //   return JSON.parse(await commentPromise);
  // }

  // const postComment = (e, username, insight) => {
  //   e.preventDefault();
  //   const params = `username=${username.value}&insight=${insight.value}`;
  //   request.open('POST', commenttURL, true);
  //   request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //   request.onreadystatechange = () => {
  //     if (request.readyState === 4 && request.status === 200) {
  //       alert(request.responseText);
  //     }
  //   };
  //   request.send(params);
  // };
}