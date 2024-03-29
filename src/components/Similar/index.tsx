import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSimilarMovies, image_path } from "../../services";
import { MoviesResponse } from "../../models/movies";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { Container, Title } from "./styles";

const Similar = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MoviesResponse>();

  useEffect(() => {
    getSimilarMovies(id ?? "").then((data) => {
      setMovie(data);
    });
  }, [id]);

  return (
    <>
      <Container>
        <Title>Similar Movies</Title>
        {movie && movie.results.length > 0 ? (
          <Swiper
            grabCursor={true}
            spaceBetween={5}
            slidesPerView={"auto"}
            navigation={true}
            modules={[Navigation]}
          >
            {movie.results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/details/${movie.id}`}>
                  <img
                    src={`${image_path}${movie.poster_path}`}
                    alt={movie.title}
                    onError={(e: any) => {
                      e.target.src = require("../../assets/movie-poster-placeholder.png");
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No similar movies were found.</p>
        )}
      </Container>
    </>
  );
};

export default Similar;
