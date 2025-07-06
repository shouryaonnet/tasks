import React from "react";
 function Card({ card, onClick }) {
const flipped = card.flipped || card.matched;

  return (
    <div
      onClick={() => onClick(card)}
      className={`w-full aspect-square cursor-pointer perspective select-none ${
        !flipped ? "hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-shadow duration-300" : ""
      }`}
      draggable={false}
    >
      <div
        className={`relative w-full h-full transform transition-transform duration-500 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white text-3xl shadow-inner border border-gray-700"
          style={{ backfaceVisibility: "hidden" }}
        ></div>

        <div
          className="absolute w-full h-full rounded-xl rotate-y-180 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-4xl font-bold flex items-center justify-center shadow-[0_0_30px_rgba(255,255,0,0.5)] border-2 border-yellow-500"
          style={{ backfaceVisibility: "hidden" }}
        >
          {card.value}
        </div>
      </div>
    </div>
  );
};
 export default Card;

