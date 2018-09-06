import React, { Component } from "react";

import styles from "styles/landing.scss";

export default class LandingInlineLogin extends Component {
  render() {
    return (
      <form className={styles.login}>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <button>Log In</button>
      </form>
    );
  }
}
