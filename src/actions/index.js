import GamesApi from "../api/GamesApi";

export const Actions = {
  FETCH_PLACE: "FETCH_PLACE",
  FETCH_UNIVERSE: "FETCH_UNIVERSE"
};

const gamesApi = new GamesApi();

export function fetchPlace(placeId, shouldFetchAssociatedUniverse) {
  return async (dispatch, getState) => {
    await dispatch({
      type: Actions.FETCH_PLACE,
      payload: gamesApi.multigetPlaceDetails([placeId]).then(placeList => placeList[0])
    });

    if (shouldFetchAssociatedUniverse) {
      const { place } = getState();
      dispatch(fetchUniverse(place.universeId));
    }
  };
}

export function fetchUniverse(universeId) {
  return {
    type: Actions.FETCH_UNIVERSE,
    payload: gamesApi.multigetUniverses([universeId]).then(universeList => universeList[0])
  };
}
