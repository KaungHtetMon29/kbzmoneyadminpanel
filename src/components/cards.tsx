import { useNavigate } from "react-router-dom";
import { deletepost } from "../utils/fetchers/fetchers";
import { useDispatch } from "react-redux";
import { delpost } from "../utils/fetchposts";

function Cards({ data }: { data: Object }) {
  const dispatch = useDispatch();
  const navi = useNavigate();
  return (
    <div className=" bg-white rounded-lg flex flex-col items-start 2xl:w-96 xl:w-80 lg:w-64 w-[80%] h-[30rem] shadow-lg ">
      {console.log(data)}
      <img
        src={data.img}
        alt={data.title}
        className={`object-cover object-center w-full xl:h-56 h-40  rounded-t-lg `}
      />
      <div className="px-5 py-4 flex flex-col gap-4 text-left w-full flex-1">
        <div className="xl:text-xl lg:text-lg font-semibold line-clamp-1">
          {data.title}
        </div>
        <div className="w-full text-left">
          <div className="flex flex-col xl:gap-8 gap-4">
            <div className="xl:text-base lg:text-sm line-clamp-5">
              <p>{data.post}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full px-5">
        <div
          className=" pt-4 pb-8 cursor-pointer flex grow"
          onClick={() => {
            navi(`/${data.postid}`);
          }}
        >
          edit
        </div>
        <div
          className=" pt-4 pb-8 cursor-pointer flex"
          onClick={() => {
            dispatch(delpost(data.postid));
          }}
        >
          delete
        </div>
      </div>
    </div>
  );
}
export default Cards;
