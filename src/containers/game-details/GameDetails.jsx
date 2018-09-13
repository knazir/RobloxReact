import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchPlace } from "../../actions";

import styles from "styles/game-details.scss";

class GameDetails extends Component {
  static get propTypes() {
    return {
      match: PropTypes.shape({
        params: PropTypes.shape({
          rootPlaceId: PropTypes.string
        })
      }),
      // action creators
      fetchPlace: PropTypes.func,
      // redux state
      place: PropTypes.object,
      universe: PropTypes.object
    };
  }

  componentDidMount() {
    if (!this.props.place) {
      this.props.fetchPlace(this.props.match.params.rootPlaceId, true);
    }
  }

  render() {
    return (
      <div className={styles.gameDetails}>
        {this.props.place ? this._getPlaceDetails() : <div/>}
        {this.props.universe ? this._getUniverseDetails() : <div/>}
      </div>
    );
  }

  _getPlaceDetails() {
    const { placeId, universeId, universeRootPlaceId, name, description } = this.props.place;
    return (
      <div className={styles.placeDetails}>
        <h1>Place Details:</h1>
        <h3><strong>ID:</strong> {placeId} {placeId === universeRootPlaceId ? "(Root Place)" : ""}</h3>
        <h3><strong>Universe ID:</strong> {universeId}</h3>
        <h3><strong>Name:</strong> {name}</h3>
        <h3><strong>Description:</strong></h3>
        <p>{description}</p>
      </div>
    );
  }

  _getUniverseDetails() {
    const { rootPlaceId, creator, playing, visits } = this.props.universe;
    return (
      <div className={styles.universeDetails}>
        <h1>Universe Details:</h1>
        <h3><strong>Root Place ID:</strong> {rootPlaceId}</h3>
        <h3><strong>Creator:</strong> {creator.name}</h3>
        <h3><strong>Playing:</strong> {playing}</h3>
        <h3><strong>Visits:</strong> {visits}</h3>
      </div>
    );
  }
}

function mapStateToProps({ place, universe }) {
  return { place, universe };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlace }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);
