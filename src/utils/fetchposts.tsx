import { createSlice } from "@reduxjs/toolkit";
import { deletepost, findall } from "./fetchers/fetchers";
import { useSelector } from "react-redux";

const posts = { postarray: [], update: false };
const Fetchpostslice = createSlice({
  name: "fetchpost",
  initialState: posts,
  reducers: {
    setposts(state, actions) {
      console.log(actions.payload);
      state.postarray = actions.payload;
    },
    setstatus(state) {
      state.update = !state.update;
      console.log(state.update);
    },
  },
});
export const fetcher = (uid: any) => {
  return async (dispatch: any) => {
    const data = await findall(uid);
    dispatch(FetchpostsActions.setposts(data));
  };
};
export const delpost = (id) => {
  return async (dispatch: any) => {
    await deletepost(id, "post");
    dispatch(FetchpostsActions.setstatus());
  };
};
export const FetchpostsActions = Fetchpostslice.actions;
export default Fetchpostslice;
