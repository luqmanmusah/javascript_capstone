const countMoviesMock = (film, target) => {
  const numMovies = film.length
  target.value = `Movies(${numMovies})`;
}

export default countMoviesMock;