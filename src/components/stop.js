import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementTurn, setRollScore, setTurnScore, setTotalScore, setDiceToRoll, setHeldDice, setLiveDice, setBankDice, } from '../reducers'

class Stop extends Component {

  render() {
    const { turnScore, nextTurn, turn } = this.props
    return (
      <div id="stop">
        <button
          id="stop-btn"
          onClick={() => {
            nextTurn(turn, turnScore)
          }}>
          Stop
          </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { turn, turnScore } = state
  return { turn, turnScore }
}

const mapDispatchToProps = dispatch => {
  return {
    nextTurn: (turn, turnScore) => {
      dispatch(incrementTurn(turn))
      dispatch(setTotalScore(turnScore))
      dispatch(setRollScore(0))
      dispatch(setTurnScore(0))
      dispatch(setDiceToRoll(6))
      dispatch(setLiveDice([]))
      dispatch(setHeldDice([]))
      dispatch(setBankDice([]))
    }
  }
}

const StopContainer = connect(mapStateToProps, mapDispatchToProps)(Stop)

export default StopContainer
