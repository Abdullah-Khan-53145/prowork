import { combineReducers } from "redux";
import allGigsReducer from "./allGigsReducer";
import setSearchReducer from "./setSearchReducer";
import userReducer from "./userReducer";
import setChatReducer from "./setChatReducer";
const reducer = combineReducers({
  userState: userReducer,
  AllGigsState: allGigsReducer,
  searchState: setSearchReducer,
  chatState: setChatReducer,
});

export default reducer;
