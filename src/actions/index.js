import { SET_ALL_GIGS, SET_SEARCH } from "./actionType";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const setAllGigs = (payload) => ({
  type: SET_ALL_GIGS,
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
