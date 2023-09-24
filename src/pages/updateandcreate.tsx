import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getone, patchone, postfetcher } from "../utils/fetchers/fetchers";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchpostsActions } from "../utils/fetchposts";
function UpdateandCreate() {
  const dispatch = useDispatch();
  const [img, setimg] = useState("");
  const [postdata, setpostdata] = useState({});
  const title = useRef("");
  const content = useRef("");
  const benefits = useRef("");
  const category = useRef("");
  const tag = useRef("");
  const date = new Date();
  const id = useSelector((state) => state.Auth.userid);
  const datestring = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const { postid } = useParams();
  console.log(postid);
  const navi = useNavigate();
  const handleImgChg = (event: any) => {
    const file = event.target.files[0];
    console.log(img);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const bdata = e.target.result;
        setimg(bdata);
      };

      reader.readAsDataURL(file);
    }
  };
  const articlesubmit = () => {
    const data = {
      img: img,
      title: title.current.value,
      date: datestring,
      post: content.current.value,
      benefits: benefits.current.value,
      category: category.current.value,
      tag: tag.current.value,
      userid: id,
    };
    if (postid !== "new") {
      patchone(data, "post", postid);
    } else {
      postfetcher(data, "post");
      dispatch(FetchpostsActions.setstatus());
    }
    navi("/");
  };
  useEffect(() => {
    async function getpost() {
      if (postid !== "new") {
        const data = await getone(postid, "post");
        setpostdata(data);
        setimg(data.img);
      }
    }

    getpost();
    dispatch(FetchpostsActions.setstatus());
  }, []);
  return (
    <div className="items-center mx-auto [&>*]:w-full flex w-80  flex-col gap-7 [&>input]:rounded-md [&>input]:py-2 [&>input]:px-4 [&>input]:bg-slate-200">
      <p className="text-center">Add article</p>
      {img.length !== 0 && (
        <img src={img} className="object-contain w-80 h-72" />
      )}

      <input
        placeholder="img"
        type="file"
        accept="image/*"
        onChange={handleImgChg}
      />
      <input
        placeholder="title"
        ref={title}
        defaultValue={postid !== "new" ? postdata.title : ""}
      />
      <textarea
        defaultValue={postid !== "new" ? postdata.post : ""}
        ref={content}
        placeholder="content"
        className="border-2 border-black w-full p-2 h-72 text-start  items-center flex text-black resize-none"
      />
      <input
        placeholder="benefits"
        ref={benefits}
        defaultValue={postid !== "new" ? postdata.benefit : ""}
      />
      <input
        placeholder="category"
        ref={category}
        defaultValue={postid !== "new" ? postdata.category : ""}
      />
      <input
        placeholder="tag"
        ref={tag}
        defaultValue={postid !== "new" ? postdata.tag : ""}
      />
      <button onClick={articlesubmit} className="p-4 bg-blue-600 text-white">
        submit
      </button>
    </div>
  );
}
export default UpdateandCreate;
