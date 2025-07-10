import React from "react";

function ToggleTabs({ selectedType, onChange }) {
  const baseStyle = "mx-4 pb-1 cursor-pointer text-lg font-medium text-gray-600";
  const activeStyle = "border-b-2 border-blue-600 text-blue-600";
  const hoverStyle = "hover:border-b-2 hover:border-gray-400";

  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-6 border-b border-gray-200">
        <span
          className={`${baseStyle} ${selectedType === "tv" ? activeStyle : hoverStyle}`}
          onClick={() => onChange("tv")}
        >
          TV Shows
        </span>
        <span
          className={`${baseStyle} ${selectedType === "movie" ? activeStyle : hoverStyle}`}
          onClick={() => onChange("movie")}
        >
          Movies
        </span>
      </div>
    </div>
  );
}

export default ToggleTabs;
