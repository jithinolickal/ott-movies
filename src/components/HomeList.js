import React, { useCallback, useEffect, useRef, useState } from "react";
import { MovieItem } from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData, moviesSelector } from "../store/movies/movieSlice";

export const HomeList = () => {
  const movieSelector = useSelector(moviesSelector);
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!movieSelector.isSearching) {
      dispatch(fetchMovieData(page));
    }
  }, [page]);

  useEffect(() => {
    if (movieSelector.isSearching) {
      setData(movieSelector.searchResult);
    } else {
      setData(movieSelector.movies);
    }
  }, [movieSelector.movies, movieSelector.searchResult]);

  const pageBottomRef = useRef();

  useEffect(() => {
    const scrollEvent = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000
      ) {
        let dataPage = data["page"] ?? undefined;
        if (
          data["page"] &&
          dataPage["page-num-requested"] * dataPage["page-size-requested"] <
            dataPage["total-content-items"]
        ) {
          setPage(page + 1);
        }
        window.removeEventListener("scroll", scrollEvent);
      }
    };
    window.addEventListener("scroll", scrollEvent);
  }, [data]);

  return (
    <div className="grid gap-x-3 gap-y-8 grid-cols-3 md:gap-x-3 md:gap-y-8 md:grid-cols-5 pt-24">
      {data["page"] &&
        data["page"]["content-items"]["content"].map((item, idx) => (
          <MovieItem
            key={idx}
            name={item.name}
            posterImage={item["poster-image"]}
          />
        ))}
      <div ref={pageBottomRef}></div>
    </div>
  );
};

