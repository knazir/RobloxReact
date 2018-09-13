import { combineReducers } from "redux";

import PlaceReducer from "./ReducerPlace";
import UniverseReducer from "./ReducerUniverse";

const rootReducer = combineReducers({
  place: PlaceReducer,
  universe: UniverseReducer
});

export default rootReducer;
