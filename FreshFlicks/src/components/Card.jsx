import React from "react";  

function Card({ item }) {
  const title = item.title || item.name; // movie or tv show
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-[160px] sm:w-[180px] hover:scale-105 transition-all duration-300">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[240px] object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">{item.overview}</p>
      </div>
    </div>
  );
}

export default Card;
