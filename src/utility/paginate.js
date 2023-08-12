import _ from "lodash";
export function Paginate(allMovies, currentPage, moviesInPage) {
  const startIndex = (currentPage - 1) * moviesInPage;
  return _(allMovies).slice(startIndex).take(moviesInPage).value();
}
