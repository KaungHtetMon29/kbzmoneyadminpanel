import { configureStore } from "@reduxjs/toolkit";
import Authslice from "./auth";
import Fetchpostslice from "./fetchposts";

const store = configureStore({
  reducer: { Auth: Authslice.reducer, Fetcher: Fetchpostslice.reducer },
});
export default store;
