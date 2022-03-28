import React from "react";
import backImage from "../assets/Back.png";
import { SearchInput } from "./SearchInput";

export const Header = () => {
  return (
    <div className="h-24 w-full mb-3 flex pt-6 fixed bg-gradient-to-b from-black via-black to-transparent">
      <div className="flex-none">
        <img src={backImage} className="h-6" />
      </div>
      <div className="flex-1 text-left font-normal text-2xl leading-6 pl-4 text-white">
        Romantic Comedy
      </div>
      <div className="flex-1">
        <SearchInput />
      </div>
    </div>
  );
};
