import React from "react";
import missingImage from "../assets/placeholder_for_missing_posters.png";

const IMAGEPATH = "./images/";

export const MovieItem = ({ name, posterImage }) => {
  return (
    <div>
      <img
      height="300px"
      width="200px"
        loading="lazy"
        src={IMAGEPATH + posterImage}
        alt={name}
        className="mb-1.5 text-white"
        onError={(e) => (e.currentTarget.onerror = null, e.currentTarget.src = missingImage)}
      ></img>
      <div className="text-left text-white text-lg font-light">{name}</div>
    </div>
  );
};
