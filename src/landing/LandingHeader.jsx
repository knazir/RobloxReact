import React, { Component } from "react";

import LandingInlineLogin from "./LandingInlineLogin";
import LandingNav from "./LandingNav";

export default class LandingHeader extends Component {
  render() {
    return (
      <header>
        <LandingNav/>
        <LandingInlineLogin/>
      </header>
    );
  }
}
