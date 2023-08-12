import { useParams, useNavigate } from "react-router-dom";
import Movie from "../components/movie";
const MovieIdHandler = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <Movie id={id} navigate={navigate} />;
};

export default MovieIdHandler;
