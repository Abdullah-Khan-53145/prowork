import { combineReducers } from "redux";
import allGigsReducer from "./allGigsReducer";
import setSearchReducer from "./setSearchReducer";
import userReducer from "./userReducer";
const reducer = combineReducers({
  userState: userReducer,
  AllGigsState: allGigsReducer,
  searchState: setSearchReducer,
});

export default reducer;
