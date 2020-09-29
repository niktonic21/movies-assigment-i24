const API_KEY = 'cf9e0df007ff568c06e0d861b874fa2c'; //move to .env to secure it

//https://api.themoviedb.org/3/discover/movie?api_key=cf9e0df007ff568c06e0d861b874fa2c&language=en-US&with_genres=10751
export const getEndPoint = (category, page = 1, extras = '') =>
    `https://api.themoviedb.org/3${category}?api_key=${API_KEY}&page=${page}${extras}`;
export const getImageEndPoint = (poster_path, width = 342) =>
    `https://image.tmdb.org/t/p/w${width}/${poster_path}`;

export const getGenreIdSuffix = (id = '') => `&with_genres=${id}`;

export const getSearchSuffix = (term = '') => `&query=${term}`;

export const getGenreId = (arr, categoryName) => {
    const obj = arr.find(({ name }) => name === categoryName);
    return obj ? obj.id : null;
};
