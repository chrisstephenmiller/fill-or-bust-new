import React, { Component } from 'react';
import { connect } from 'react-redux'
import { calcTotalScore, bankHeldDice, } from '../reducers'

class Stop extends Component {
  render() {
    const { dice, rollScore, turnScore, totalScore, bankHeldDice, calcTotalScore, } = this.props
    return <div id="roll">
      <button
        id="roll-btn"
        onClick={() => {
          bankHeldDice(dice)
          calcTotalScore(rollScore, turnScore, totalScore)
        }}>
        Stop
      </button>
    </div>
  }
}

const mapStateToProps = state => {
  const { dice, rollScore, turnScore, totalScore } = state
  return { dice, rollScore, turnScore, totalScore }
}

const mapDispatchToProps = dispatch => {
  return {
    bankHeldDice: dice => {
      dispatch(bankHeldDice(dice))
    },
    calcTotalScore: (rollScore, turnScore, totalScore) => {
      dispatch(calcTotalScore(rollScore, turnScore, totalScore))
    },
  }
}

const StopContainer = connect(mapStateToProps, mapDispatchToProps)(Stop)

export default StopContainer