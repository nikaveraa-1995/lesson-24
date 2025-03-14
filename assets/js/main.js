let moviesList = null;

const createElement = (type, attrs, container) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach(key => {
    el.setAttribute(key, attrs[key]);
  });

  container.append(el);
};

const createStyle = () => {
  const style = document.createElement('style');

  style.innerHTML = `* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.container {
  padding: 20px;
}
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.movie {
  display: flex;
  align-content: center;
  justify-content: center;
}
.movie__image {
  width: 100%;
}`;

  document.head.append(style);
};

const createMarkup = () => {
  const container = document.createElement('div');
  const movies = document.createElement('div');

  container.setAttribute('class', 'container');
  movies.setAttribute('class', 'movies');

  // <div class="search">
  //   <div class="search__group search__group--input">
  //     <label for="search">Search movies</label>
  //     <input id="search" type="search" placeholder="start typing..." />
  //   </div>

  //   <div class="search__group search__group--chekbox">
  //     <label for="chekbox">add movies to those already found</label>
  //     <input id="chekbox" type="chekbox" />
  //   </div>
  // </div>

  const header = document.createElement('h1');

  header.innerHTML = 'Movie search app';
  container.append(header);

  const search = createElement('div', { class: 'search' }, container);

  const searchInput = createElement(
    'input',
    { class: 'search__input', id: 'search', placeholder: 'start typing...' },
    container,
  );

  container.append(movies);
  document.body.prepend(container);

  moviesList = document.querySelector('.movies');
};

const addMovieToList = movie => {
  const item = document.createElement('div');
  const img = document.createElement('img');

  item.setAttribute('class', 'movie');
  img.setAttribute('class', 'movie__image');

  img.src = /^(http|https):\/\//i.test(movie.Poster)
    ? movie.Poster
    : 'assets/images/no-image-available-icon-vector.jpg';

  img.alt = `${movie.Title}, ${movie.Year}`;
  img.title = `${movie.Title}, ${movie.Year}`;

  item.append(img);
  moviesList.append(item);
};

const getData = url =>
  fetch(url)
    .then(responce => responce.json())
    .then(json => json.Search);

const search = 'ironman';

createMarkup();
createStyle();

getData(`http://www.omdbapi.com/?apikey=e69e7272&s=${search}`)
  .then(movies => movies.forEach(movie => addMovieToList(movie)))
  .catch(err => console.log(err));
