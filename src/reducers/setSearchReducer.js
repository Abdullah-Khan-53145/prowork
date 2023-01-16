import { SET_SEARCH } from "../actions/actionType";
const initialState = { filter: "all", key: "" };

const setSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default setSearchReducer;
