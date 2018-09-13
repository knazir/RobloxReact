import React, { Component } from "react";

import LandingLogin from "./LandingLogin";
import LandingNav from "./LandingNav";

export default class LandingHeader extends Component {
  render() {
    return (
      <header>
        <LandingNav/>
        <LandingLogin/>
      </header>
    );
  }
}
