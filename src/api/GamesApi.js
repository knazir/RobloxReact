import Api from "./Api";

export default class GamesApi extends Api {
  constructor() {
    super("games");
  }

  _prefixGamesPath(path = "") {
    return `/v1/games${path}`;
  }

  async multigetUniverses(universeIds) {
    const queryParams = universeIds.map(id => `universeIds=${id}`).join("&");
    return this.get(this._prefixGamesPath(), queryParams).then(res => res.data);
  }

  async multigetPlaceDetails(placeIds) {
    const queryParams = placeIds.map(id => `placeIds=${id}`).join("&");
    return this.get(this._prefixGamesPath("/multiget-place-details"), queryParams);
  }
}
