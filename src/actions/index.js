import { SET_ALL_GIGS, SET_SEARCH, SET_USER, SET_CHAT } from "./actionType";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { db } from "../firebase";

export const setAllGigs = (payload) => ({
  type: SET_ALL_GIGS,
  payload: payload,
});
export const setChat = (payload) => ({
  type: SET_CHAT,
  payload: payload,
});
export const setSearch = (payload) => ({
  type: SET_SEARCH,
  payload: payload,
});

export function setSearchAPI(payload) {
  return async (dispatch) => {
    dispatch(setSearch(payload));
  };
}
export function setChatAPI(payload) {
  return async (dispatch) => {
    dispatch(setChat(payload));
  };
}
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export function setAllGigsAPI() {
  return async (dispatch) => {
    let gigarr = [];
    const q = query(collection(db, "gigs"), orderBy("average_rating", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      gigarr.push({ ...doc.data(), id: doc.id });
    });
    dispatch(setAllGigs(gigarr));
  };
}

export function SignInWithGoogleAPI() {
  return async (dispatch) => {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("user", JSON.stringify(result.user));
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    console.log(result.user);
  };
}

export function SignInWithEmailPasswordAPI(user) {
  return async (dispatch) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  };
}

export function SignOutAPI() {
  return async (dispatch) => {
    localStorage.setItem("user", null);
    dispatch(setUser(null));
    await signOut(auth);
  };
}
