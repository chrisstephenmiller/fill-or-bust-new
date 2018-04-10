import React, { Component } from 'react';
import { connect } from 'react-redux'

class Score extends Component {

  render() {
    const { currentScore } = this.props
    return (
      <div id="score">
        <h1>Current score: {currentScore} </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentScore } = state
  return { currentScore }
}

const ScoreContainer = connect(mapStateToProps)(Score)

export default ScoreContainer
