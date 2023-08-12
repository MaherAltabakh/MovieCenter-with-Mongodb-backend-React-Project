import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Joi from "joi-browser";

import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return <MovieFormClass id={id} navigate={navigate} />;
};

class MovieFormClass extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    try {
      const { id: movieId } = this.props;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const { navigate } = this.props;
        navigate("/not-found", { replace: true });
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    const { navigate } = this.props;
    //call the server
    await saveMovie(this.state.data);
    navigate("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <br />
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          <br />
          {this.renderInput("numberInStock", "number in Stock", "number")}
          <br />
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          <br />
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
