import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards";
import { useDispatch } from "react-redux";
import { fetcher } from "../utils/fetchposts";
function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Fetcher.postarray);
  const status = useSelector((state) => state.Fetcher.update);
  const uid = useSelector((state) => state.Auth.userid);
  const navi = useNavigate();
  useEffect(() => {
    dispatch(fetcher(uid));
  }, [status]);
  return (
    <div className="flex gap-8 my-12 mx-12 flex-col">
      <button onClick={() => navi("/new")}>create new</button>
      <div className="flex gap-8 flex-wrap items-center justify-center">
        {posts !== undefined && posts.map((e, i) => <Cards data={e} key={i} />)}
      </div>
    </div>
  );
}
export default Home;
