import { createSlice } from "@reduxjs/toolkit";
const auth = { userid: null, name: "", img: "", signed: false, errmsg: "" };

const Authslice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    signed(state, actions) {
      state.userid = actions.payload.userid;
      state.name = actions.payload.name;
      state.img = actions.payload.img;
      state.signed = true;
    },
    signout(state) {
      state.name = "";
      state.img = "";
      state.signed = false;
    },
    seterrmsg(state, actions) {
      state.errmsg = actions.payload;
    },
  },
});
export const loginfunc = (name: string, pw: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ name: name, pw: pw }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error(data.message);
          default:
            throw new Error("smth wrong");
        }
      }
      dispatch(Authactions.seterrmsg(""));
      dispatch(Authactions.signed(data));
    } catch (error) {
      dispatch(Authactions.seterrmsg(error.message));
      console.log(error.message);
    }
  };
};
export const Authactions = Authslice.actions;

export default Authslice;
