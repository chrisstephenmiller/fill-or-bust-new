import React, { Component } from 'react';
import { connect } from 'react-redux'
import { calcTurnScore, bankHeldDice, rollLiveDice, rollNewDice, fillOrBust, incrementRolls } from '../reducers'

class Roll extends Component {

  // shouldComponentUpdate = () => {
  //   const { numRolls } = this.props
  //   if (this.numRolls = numRolls) return false
  //   return true
  // }

  // componentDidUpdate = () => {
  //   const { dice, numRolls, fillOrBust } = this.props
  //   this.numRolls = numRolls
  //   fillOrBust(dice)
  // }

  render() {
    const { dice, rollScore, turnScore, calcTurnScore, bankHeldDice, rollLiveDice, rollNewDice, fillOrBust, incrementRolls, numRolls } = this.props
    return <div id="roll">
      <button
        id="roll-btn"
        onClick={() => {
          calcTurnScore(rollScore, turnScore)
          bankHeldDice(dice)
          rollLiveDice(dice)
          rollNewDice(dice)
          incrementRolls(numRolls)
        }}>
        Roll
      </button>
    </div>
  }
}

const mapStateToProps = state => {
  const { dice, rollScore, turnScore, numRolls } = state
  return { dice, rollScore, turnScore, numRolls }
}

const mapDispatchToProps = dispatch => {
  return {
    calcTurnScore: (rollScore, turnScore) => {
      dispatch(calcTurnScore(rollScore, turnScore))
    },
    bankHeldDice: dice => {
      dispatch(bankHeldDice(dice))
    },
    rollLiveDice: dice => {
      dispatch(rollLiveDice(dice))
    },
    fillOrBust: dice => {
      dispatch(fillOrBust(dice))
    },
    rollNewDice: dice => {
      if (dice.length !== 0) return
      dispatch(rollNewDice(dice))
    },
    incrementRolls: numRolls => {
      dispatch(incrementRolls(numRolls))
    }
  }
}

const RollContainer = connect(mapStateToProps, mapDispatchToProps)(Roll)

export default RollContainer
