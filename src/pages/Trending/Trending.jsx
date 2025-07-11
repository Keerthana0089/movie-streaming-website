import React, { useEffect, useState } from "react";
import { fetchTrending } from "../../api/movieApi";
import MovieCard from "../../components/MovieCard/MovieCard";
import HeroBanner from "../../components/HeroBanner/HeroBanner"; // 👈 Import your existing component
import "./trending.css";

const Trending = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      const movies = await fetchTrending();
      setTrending(movies);
    };
    getTrending();
  }, []);

  return (
    <div className="trending-page">
      <HeroBanner /> {/* 👈 Replace static image with your hero slider */}

      <div className="trending-section">
        <h2 className="section-title">🔥 Trending Now</h2>
        <div className="movie-list">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
