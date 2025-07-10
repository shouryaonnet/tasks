import React, { useEffect, useState, useRef } from "react";
import { fetchNowPlayingMovies, fetchAiringTVShows } from "../api/tmdb";
import Card from "./Card";
import ToggleTabs from "./ToggleTabs";

function Tmdb() {
  const [selectedType, setSelectedType] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    setMovies([]);
    setTvShows([]);
    setPage(1);
  }, [selectedType]);

  useEffect(() => {
    setLoading(true);

    if (selectedType === "movie") {
      fetchNowPlayingMovies(page).then(function (data) {
        setMovies(function (prev) {
          return prev.concat(data);
        });
        setLoading(false);
      });
    }

    if (selectedType === "tv") {
      fetchAiringTVShows(page).then(function (data) {
        setTvShows(function (prev) {
          return prev.concat(data);
        });
        setLoading(false);
      });
    }
  }, [selectedType, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && loading === false) {
        setPage(function (prev) {
          return prev + 1;
        });
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return function () {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  let items = [];
  if (selectedType === "movie") {
    items = movies;
  } else {
    items = tvShows;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Latest {selectedType === "movie" ? "Movies" : "TV Shows"}
      </h1>

      <ToggleTabs selectedType={selectedType} onChange={setSelectedType} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map(function (item) {
          return <Card item={item} key={item.id} />;
        })}
      </div>

      <div
        ref={observerRef}
        className="h-10 mt-8 flex justify-center items-center text-gray-500"
      >
        {loading ? "Loading more..." : "Scroll down to load more"}
      </div>
    </div>
  );
}

export default Tmdb;
