import React, { Component } from "react";
import { Route } from "react-router-dom";

import GameDetails from "./containers/game-details/GameDetails";
import Landing from "./components/landing/Landing";
import CommonHeader from "./components/common/header/CommonHeader";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Landing} exact strict/>
        <Route path="/(.+)" component={CommonHeader}/>
        <Route path="/games/:rootPlaceId" component={GameDetails} exact/>
      </div>
    );
  }
}
