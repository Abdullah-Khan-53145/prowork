import { SET_ALL_GIGS } from "../actions/actionType";
const initialState = [];

const allGigsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_GIGS:
      return action.payload;
    default:
      return state;
  }
};

export default allGigsReducer;
