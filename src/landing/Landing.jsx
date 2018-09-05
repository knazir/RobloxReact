import React, { Component } from "react";

import Action from "./Action";
import Header from "./Header";

import styles from "styles/landing.scss";

export default class Landing extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Header/>
        <Action/>
      </div>
    );
  }
}
