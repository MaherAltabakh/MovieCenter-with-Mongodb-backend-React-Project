import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { Paginate } from "../utility/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    moviesInPage: 4,
    selectedGenre: null,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const newGenre = [{ _id: "", name: "All Genre" }, ...data];
    this.setState({ movies, genres: newGenre });
  }
  getPageData = () => {
    const {
      movies,
      selectedGenre,
      sortColumn,
      currentPage,
      moviesInPage,
      searchQuery,
    } = this.state;

    let filtered = movies;
    if (searchQuery)
      filtered = movies.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

    const Sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedMovies = Paginate(Sorted, currentPage, moviesInPage);

    return { totalCount: filtered.length, data: paginatedMovies };
  };
  render() {
    const { length: moviesCount } = this.state.movies;
    const {
      genres,
      selectedGenre,
      sortColumn,
      currentPage,
      moviesInPage,
      searchQuery,
    } = this.state;
    const { user } = this.props;
    // if (moviesCount === 0)
    //   return (
    //     <p>
    //       there is <strong>No </strong>movie in the database!
    //     </p>
    //   );
    const { totalCount, data } = this.getPageData();
    return (
      <div className="row">
        <div className="col-md-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-md">
          {user && (
            <Link
              to="/movies/new"
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
            >
              New Movie
            </Link>
          )}
          <p>
            We have <strong> {totalCount} </strong>movies in our database!
          </p>
          <SearchBox onChange={this.handleSearch} value={searchQuery} />
          <br />
          <MoviesTable
            paginatedMovies={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            moviesCount={totalCount}
            moviesInPage={moviesInPage}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
  handleLike = (movie) => {
    const newMovie = [...this.state.movies];
    const index = newMovie.indexOf(movie);
    newMovie[index] = { ...movie };
    newMovie[index].like = !newMovie[index].like; //toggle the like property
    this.setState({ movies: newMovie });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 });
  };

  handleDelete = async (movie, itemNumbers) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      // we will implement an optimistic update
      const originalMovies = this.state.movies;
      const updatedMovies = originalMovies.filter((m) => movie._id !== m._id);
      this.setState({ movies: updatedMovies });
      try {
        await deleteMovie(movie._id);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          toast.error("This movie has already been deleted!");
        }
        this.setState({ movies: originalMovies });
      }

      //here we are setting the current page to a previous one if there is no item on the current page
      if (!itemNumbers) {
        const currentPage = this.state.currentPage - 1;
        this.setState({ currentPage });
      }
    }
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default Movies;
