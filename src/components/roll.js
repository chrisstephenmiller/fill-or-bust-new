import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setBankDice, setHeldDice, setLiveDice, setTurnScore, setRollScore, calcHeldPointers } from '../reducers'

class Roll extends Component {

  render() {
    const { scorePointers, rollScore, liveDice, heldDice, bankDice, diceToRoll, bankHeldDice, rollDice, turnScore} = this.props
    return (
      <div id="roll">
        <button
          id="roll-btn"
          value={validatePointers(liveDice, heldDice)}
          onClick={() => {
            if (!validatePointers(liveDice, heldDice)) return
            scorePointers(rollScore, turnScore)
            bankHeldDice(heldDice, bankDice)
            rollDice(diceToRoll)
          }}>
          Roll
          </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { liveDice, heldDice, bankDice, diceToRoll, rollScore, turnScore} = state
  return { liveDice, heldDice, bankDice, diceToRoll, rollScore, turnScore }
}

const validatePointers = (liveDice, heldDice) => {
  if (liveDice.length === 0 && heldDice.length === 0) return true
  if (heldDice.length === 0) return false
  let valid = true;
  const pointers = calcHeldPointers(heldDice)
  pointers.forEach((p, i) => {
    if (p > 0 && p < 3 && (i + 1 !== 1 && i + 1 !== 5))
    valid = false;
  })
  if (pointers.filter(p => p === 1).length === 6) valid = true
  return valid
}

const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
}

const mapDispatchToProps = dispatch => {
  return {
    bankHeldDice: (heldDice, bankDice) => {
      heldDice.forEach(d => d.status = `bank`)
      const allDice = [...heldDice, ...bankDice]
      dispatch(setBankDice(allDice))
      dispatch(setHeldDice([]))
    },
    scorePointers: (rollScore, turnScore) => {
      dispatch(setTurnScore(rollScore + turnScore))
      dispatch(setRollScore(0))
    },
    rollDice: diceToRoll => {
      const liveDice = [];
      for (let i = diceToRoll; i > 0; i--) { liveDice.push(rollDie()) }
      dispatch(setLiveDice(liveDice))
    },
  }
}

const RollContainer = connect(mapStateToProps, mapDispatchToProps)(Roll)

export default RollContainer
