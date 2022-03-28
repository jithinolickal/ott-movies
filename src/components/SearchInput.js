import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, search } from "../store/movies/movieSlice";

export const SearchInput = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(search(searchText));
    if (searchText === "") {
        dispatch(clearSearch());
      }
  }, [searchText]);

  const handleChange = (value) => {
      setSearchText(value);
  };
  return (
    <input
      className="bg-[url('/src/assets/search.png')] bg-black bg-no-repeat w-6 float-right mr-6 outline-none text-white pl-7 hover:w-44 hover:border-b-2"
      style={{ backgroundSize: "25px", transition: "width 0.4s ease-in-out" }}
      type="text"
      value={searchText}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
