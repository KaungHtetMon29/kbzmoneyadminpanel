import { useDispatch, useSelector } from "react-redux";
import { FetchpostsActions } from "../fetchposts";
import { useId } from "react";

export const postfetcher = async (input: Object, path: string) => {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/${path}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(input),
  });
  const response = await data.json();
  return response;
};
export const getone = async (id: string | number, path: string) => {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/${path}/${id}`);
  const res = await data.json();
  return res;
};
export const patchone = async (
  input: Object,
  path: string,
  id: string | number
) => {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/${path}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(input),
  });
  const response = await data.json();
  return response;
};
export const findall = async (userid: any, page: number, count: number) => {
  const data = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/post?user=${userid}&&page=${page}&&count=${count}`
  );
  const response = await data.json();
  console.log(response.ok);

  return { data: response, status: response.ok };
};
export const deletepost = async (id: string | number, path: string) => {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/${path}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  });
  const response = await data.json();
  return response;
};
