import { useEffect, useRef, useState } from "react";
import { postfetcher } from "../utils/fetchers/fetchers";
import { redirect, useNavigate } from "react-router-dom";
function Signup() {
  const [pfimg, setimg] = useState("");
  const [checkpw, setcheckpw] = useState(true);
  const [showpw, setshowpw] = useState(false);
  const [status, setstatus] = useState("");
  const name = useRef("");
  const pw = useRef("");
  const repw = useRef("");
  const navi = useNavigate();
  const handleImgChg = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const bdata = e.target.result;
        setimg(bdata);
      };

      reader.readAsDataURL(file);
    }
  };
  const signupfunc = async () => {
    pw.current.value !== repw.current.value && setcheckpw(false);
    const data = { name: name.current.value, pw: pw.current.value, img: pfimg };
    const res = await postfetcher(data, "user");
    setstatus(res.msg);
    res.msg !== "duplicate" && navi("/");
  };
  return (
    <div className="flex flex-col w-fit items-center gap-4 mx-auto">
      <p className="">Signup</p>

      <input
        className="w-fit py-2 px-4 bg-gray-200 "
        placeholder="img"
        type="file"
        accept="image/*"
        onChange={handleImgChg}
      />

      <input
        ref={name}
        placeholder="name"
        className="bg-gray-200 py-2 px-4 text-black w-full"
      />
      {status === "duplicate" && <p>That name is already taken</p>}
      <input
        type={showpw ? "text" : "password"}
        ref={pw}
        placeholder="password"
        className="bg-gray-200 py-2 px-4 text-black w-full "
      />
      <div className="text-center w-full flex flex-col gap-2">
        <input
          type={showpw ? "text" : "password"}
          ref={repw}
          placeholder="re-enter password"
          className="bg-gray-200 py-2 px-4 text-black w-full"
        />
        <button
          className={`py-2 px-6 rounded-full text-center ${
            showpw ? "bg-red-500" : "bg-green-500"
          } text-white`}
          onClick={() => {
            setshowpw(!showpw);
          }}
        >
          {showpw ? "hide password" : "show password"}
        </button>
        {!checkpw ? <p>Not the same password re-enter again</p> : <></>}
      </div>

      <button
        onClick={signupfunc}
        className="py-2 px-6 w-full  rounded-full text-center bg-blue-600 text-white"
      >
        signup
      </button>
      <button
        onClick={() => {
          navi("/login");
        }}
        className="py-2 px-6 rounded-full w-full text-center bg-blue-600 text-white"
      >
        login
      </button>
    </div>
  );
}
export default Signup;
