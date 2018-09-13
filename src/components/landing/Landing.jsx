import React, { Component } from "react";

import LandingSearch from "./LandingSearch";
import LandingHeader from "./LandingHeader";

import styles from "styles/landing.scss";

export default class Landing extends Component {
  render() {
    return (
      <div className={styles.home}>
        <LandingHeader/>
        <LandingSearch/>
      </div>
    );
  }
}
