import React, { Component } from "react";

import Login from "./Login";
import Nav from "./Nav";

export default class Header extends Component {
  render() {
    return (
      <header>
        <Nav/>
        <Login/>
      </header>
    );
  }
}
