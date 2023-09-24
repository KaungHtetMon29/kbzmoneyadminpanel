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
  const pcount = useSelector((state) => state.Fetcher.count);
  const navi = useNavigate();
  const [page, setpage] = useState(1);
  const [count, setcount] = useState(6);
  useEffect(() => {
    dispatch(fetcher(uid, page, count));
  }, [status, page]);
  return (
    <div className="flex gap-8 my-12 mx-12 flex-col">
      <button
        onClick={() => navi("/new")}
        className="py-2 px-6 rounded-full w-fit mx-auto text-center bg-green-500 text-white"
      >
        create new
      </button>

      <div className="flex gap-8 flex-wrap items-center justify-center w-[90%] mx-auto">
        {posts !== undefined && posts.map((e, i) => <Cards data={e} key={i} />)}
      </div>
      <div className="mx-auto flex gap-5">
        <button
          onClick={() => {
            setpage(page - 1);
          }}
          className={`${
            page === 1
              ? "cursor-not-allowed pointer-events-none opacity-60"
              : ""
          }py-2 px-6 rounded-full w-fit mx-auto text-center bg-green-500 text-white`}
        >
          prev
        </button>

        <button
          onClick={() => {
            setpage(page + 1);
          }}
          className={`${
            page * count >= pcount
              ? "pointer-events-none cursor-not-allowed"
              : ""
          }py-2 px-6 rounded-full w-fit mx-auto text-center bg-green-500 text-white`}
        >
          next
        </button>
      </div>
    </div>
  );
}
export default Home;
