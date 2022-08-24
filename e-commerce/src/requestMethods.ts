import axios from "axios";

// const BASE_URL = "http://localhost:4000/";
const BASE_URL = "https://darsi-new.herokuapp.com/";
const user = JSON.parse(localStorage.getItem("persist:root") || '{}')?.user;
  
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `` }
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});