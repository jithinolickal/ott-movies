import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
  status: "idle",
  searchResult : {},
  isSearching: false,
};

export const fetchMovieData = createAsyncThunk(
  "movies/fetchMovieData",
  async (pageNumber) => {
    const response = await fetch(
      `data/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`
    );
    return await response.json();
  }
);

export const movieSlice = createSlice({
  name: "movie-slice",
  initialState,
  reducers: {
    search: (state, {payload}) => {
      const currentMovieState = current(state.movies)
      if(currentMovieState["page"]){
          const newState = JSON.parse(JSON.stringify(currentMovieState));
          const filteredData = currentMovieState["page"]["content-items"]["content"].filter(item=>{
              return item.name.toLowerCase().includes(payload.toLowerCase())
          })
          newState["page"]["content-items"]["content"] = filteredData
          state.isSearching = true
          state.searchResult = newState
        }
    },
    clearSearch: (state)=>{
        state.isSearching = false
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.status = "idle";
        const resData = action.payload;
        if (state.movies["page"]) {
          resData["page"]["content-items"]["content"] = [
            ...state.movies["page"]["content-items"]["content"],
            ...resData["page"]["content-items"]["content"],
          ];
        }
        state.movies = resData;
      });
  },
});

export const { search, clearSearch } = movieSlice.actions;

export const moviesSelector = (state) => state.movies;

export default movieSlice.reducer;
