import React, { Component } from "react";
import PropTypes from "prop-types";

export default class GameDetails extends Component {
  static get propTypes() {
    return {
      match: PropTypes.shape({
        params: PropTypes.shape({
          rootPlaceId: PropTypes.string
        })
      })
    };
  }

  render() {
    return (
      <div>
        <h1>Details for Place {this.props.match.params.rootPlaceId}</h1>
      </div>
    );
  }
}
