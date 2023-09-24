import { useEffect, useRef } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { Authactions, loginfunc } from "../utils/auth";
import { redirect, useNavigate } from "react-router-dom";
function Login() {
  const navi = useNavigate();
  const name = useRef(null);
  const pw = useRef(null);
  const dispatch = useDispatch();
  const status = useSelector((state: any) => state.Auth.signed);
  const err = useSelector((state: any) => state.Auth.errmsg);
  const login = () => {
    dispatch(loginfunc(name.current.value, pw.current.value));
  };
  useEffect(() => {
    status && navi("/");
  }, [status]);
  return (
    <div className="flex flex-col w-fit items-center gap-4 mx-auto">
      <p className="">login</p>
      <input
        placeholder="name"
        className="bg-gray-200 py-2 px-4 text-black"
        ref={name}
      />
      <div className="text-center">
        <input
          ref={pw}
          placeholder="password"
          className="bg-gray-200 py-2 px-4 text-black"
        />
        {err.length !== 0 && <p>{err}</p>}
      </div>

      <button
        onClick={() => login()}
        className="py-2 px-6 rounded-full text-center bg-blue-600 text-white"
      >
        Login
      </button>
      <p>dont have account?</p>
      <button
        onClick={() => navi("/signup")}
        className="py-2 px-6 rounded-full text-center bg-green-500 text-white"
      >
        signup
      </button>
    </div>
  );
}
export default Login;
