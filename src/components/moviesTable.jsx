import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  // we don't have to create the columns property and initialize it as a part of the state,
  // because it's not going to change throughout the lifecycle of this component
  // so a simple property is sufficient
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onLiked={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    }, // we don't have to add anything here as the like and delete columns don't have a label and we won't sort according to this column. However, we added the key property so we won't have a warning when mapping this object
  ];

  deleteColumn = {
    key: "delete",
    content: (movie, data) => (
      <button
        onClick={() => this.props.onDelete(movie, data.length - 1)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { paginatedMovies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={paginatedMovies}
      />
    );
  }
}

export default MoviesTable;
