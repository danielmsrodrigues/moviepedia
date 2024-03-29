import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoviesResponse } from "../../models/movies";
import { getMovieDetails, image_path } from "../../services";
import { Container, GoBack, MovieDetails, MovieInfo } from "./styles";
import Header from "../../components/Header";
import { BsClockHistory, BsCalendarDate } from "react-icons/bs";
import Similar from "../../components/Similar";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MoviesResponse>();

  useEffect(() => {
    getMovieDetails(id ?? "").then((data) => {
      setMovie(data);
    });
  }, [id]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <Container>
        {movie && (
          <MovieInfo>
            <img
              src={`${image_path}${movie.poster_path}`}
              alt={movie.title}
              onError={(e: any) => {
                e.target.src = require("../../assets/movie-poster-placeholder.png");
              }}
            />
            <MovieDetails>
              <h2>{movie.title ? movie.title : "No title available."}</h2>
              <p>
                {movie.overview ? movie.overview : "No overview available."}
              </p>
              <p>
                <BsClockHistory />{" "}
                {movie.runtime ? `${movie.runtime}m` : "No runtime available."}
              </p>
              <span>
                <BsCalendarDate />{" "}
                {movie.release_date
                  ? movie.release_date
                  : "No release date available."}
              </span>
              <GoBack onClick={handleGoBack}>Go Back</GoBack>
            </MovieDetails>
          </MovieInfo>
        )}
      </Container>
      <Similar />
    </>
  );
};

export default Details;
