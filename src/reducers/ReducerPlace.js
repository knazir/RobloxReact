import { Actions } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case Actions.FETCH_PLACE:
      return action.payload;
    default:
      return state;
  }
}
