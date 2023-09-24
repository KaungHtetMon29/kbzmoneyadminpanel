import { createSlice } from "@reduxjs/toolkit";
import { deletepost, findall } from "./fetchers/fetchers";
import { useSelector } from "react-redux";

const posts = { postarray: [], update: false, count: 0 };
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
    setcount(state, action) {
      state.count = action.payload;
      console.log(action.payload);
    },
  },
});
export const fetcher = (uid: any, page: number, count: number) => {
  return async (dispatch: any) => {
    const data = await findall(uid, page, count);
    console.log(data.data.count);
    dispatch(FetchpostsActions.setposts(data.data.post));
    dispatch(FetchpostsActions.setcount(data.data.count));
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
