import React, { Component } from "react";
import { Route } from "react-router-dom";

import GameDetails from "./game-details/GameDetails";
import Landing from "./landing/Landing";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Landing} exact/>
        <Route path="/games/:rootPlaceId" component={GameDetails}/>
      </div>
    );
  }
}
