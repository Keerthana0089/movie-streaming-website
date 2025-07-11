import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/Spinner/Spinner";
import "./search.css";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const { movies, loading } = useSelector((state) => state.movies);
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredMovies([]);
    } else {
      const q = query.toLowerCase();
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(q)
      );
      setFilteredMovies(results);
    }
  }, [query, movies]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : query.trim() === "" ? (
        <p className="empty">Start typing to search for movies 🎬</p>
      ) : filteredMovies.length === 0 ? (
        <p className="empty">No results found for "{query}" 😢</p>
      ) : (
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
