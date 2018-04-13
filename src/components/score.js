import React, { Component } from 'react';
import { connect } from 'react-redux'

class Score extends Component {
  render() {
    const { rollScore, turnScore, totalScore } = this.props
    return <div id="score">
      <h4>Roll score: {rollScore}</h4>
      <h4>Turn score: {turnScore}</h4>
      <h4>Total score: {totalScore}</h4>
    </div>
  }
}

const mapStateToProps = state => {
  const { rollScore, turnScore, totalScore } = state
  return { rollScore, turnScore, totalScore }
}

const ScoreContainer = connect(mapStateToProps)(Score)

export default ScoreContainer