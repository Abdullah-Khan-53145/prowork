import { SET_CHAT } from "../actions/actionType";
const initialState = 0;

const setChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT:
      return action.payload;
    default:
      return state;
  }
};

export default setChatReducer;
