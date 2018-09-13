import React, { Component } from "react";

import styles from "styles/common/header.scss";

export default class CommonHeader extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img src={utils.staticUrl("images/roblox-white.png")}/>
      </header>
    );
  }
}
