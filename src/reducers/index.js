import { combineReducers } from "redux";
import allGigsReducer from "./allGigsReducer";
import setSearchReducer from "./setSearchReducer";
const reducer = combineReducers({
  AllGigsState: allGigsReducer,
  searchState: setSearchReducer,
});

export default reducer;
