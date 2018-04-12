import React, { Component } from 'react';
import { connect } from 'react-redux'

class Score extends Component {

  render() {
    const { turn, rollScore, turnScore, totalScore } = this.props
    return (
      <div id="score">
        <h1>Turn: {turn}</h1>
        <h1>Roll score: {rollScore} </h1>
        <h1>Turn score: {turnScore} </h1>
        <h1>Total score: {totalScore} </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { turn, rollScore, turnScore, totalScore } = state
  return { turn, rollScore, turnScore, totalScore }
}

const ScoreContainer = connect(mapStateToProps)(Score)

export default ScoreContainer
