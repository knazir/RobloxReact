import React, { Component } from "react";
import { Route } from "react-router-dom";

import GameDetails from "./game-details/GameDetails";
import Landing from "./landing/Landing";
import Header from "./common/Header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Landing} exact strict/>
        <Route path="/(.+)" component={Header}/>
        <Route path="/games/:rootPlaceId" component={GameDetails} exact/>
      </div>
    );
  }
}
