import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "styles/landing.scss";

const navLinks = Object.freeze({
  play: { text: "Play", link: "#RollerContainer" },
  about: { text: "About", link: "#WhatsRobloxContainer" },
  platforms: { text: "Platforms", link: "#RobloxDeviceText" }
});

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: navLinks.play };
  }

  onLinkClick(linkKey) {
    this.setState({ selected: navLinks[linkKey] });
  }

  createLink(key, { text, link }) {
    const isActive = navLinks[key] === this.state.selected;
    return (
      <Link key={key} to={link} className={isActive ? styles.active : null} onClick={() => this.onLinkClick(key)}>
        {text}
      </Link>
    );
  }

  render() {
    return (
      <nav>
        <img src={utils.staticUrl("images/icon-white.png")}/>
        {Object.entries(navLinks).map(([key, linkInfo]) => this.createLink(key, linkInfo))}
      </nav>
    );
  }
}
