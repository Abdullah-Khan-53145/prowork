import { SET_USER } from "../actions/actionType";
const userInitialState = (str) => {
  return JSON.parse(str);
};
const initialState = {
  user: userInitialState(localStorage.getItem("user")),
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
