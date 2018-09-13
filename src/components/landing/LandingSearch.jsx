import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import styles from "styles/landing.scss";

export default class LandingSearch extends Component {
  static get propTypes() {
    return {
      fetchPlace: PropTypes.func
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      rootPlaceId: "",
      redirect: false
    };
  }

  searchForPlace(event) {
    event.preventDefault();
    this.setState({ redirect: true });
  }

  updateRootPlaceId(event) {
    this.setState({ rootPlaceId: event.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/games/${this.state.rootPlaceId}`}/>;
    }

    return (
      <div className={styles.action}>
        <img src={utils.staticUrl("images/logo.png")}/>
        <form onSubmit={event => this.searchForPlace(event)}>
          <h3>Search for a place by ID!</h3>
          <input type="text" placeholder="Place ID" onChange={event => this.updateRootPlaceId(event)}/>
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}
