import React, { Component } from 'react';
import { connect } from 'react-redux'
import { calcTurnScore, bankHeldDice, rollLiveDice, rollNewDice, fillOrBust } from '../reducers'

class Roll extends Component {

  componentDidUpdate = () => {
    const { dice, fillOrBust } = this.props
    fillOrBust(dice)
  }

  render() {
    const { dice, rollScore, turnScore, calcTurnScore, bankHeldDice, rollLiveDice, rollNewDice, fillOrBust } = this.props
    return <div id="roll">
      <button
        id="roll-btn"
        onClick={() => {
          calcTurnScore(rollScore, turnScore)
          bankHeldDice(dice)
          rollLiveDice(dice)
          rollNewDice(dice)
        }}>
        Roll
      </button>
    </div>
  }
}

const mapStateToProps = state => {
  const { dice, rollScore, turnScore } = state
  return { dice, rollScore, turnScore }
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
      dispatch(rollNewDice(dice))
    }
  }
}

const RollContainer = connect(mapStateToProps, mapDispatchToProps)(Roll)

export default RollContainer
