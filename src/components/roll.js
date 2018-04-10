import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setBankDice, setHeldDice, setLiveDice, setTotalScore, setCurrentScore, } from '../reducers'



class Roll extends Component {

  render() {
    const { scorePointers, currentScore, heldDice, diceToRoll, bankDice, rollDice } = this.props
    return (
      <div id="roll">
        <button
          id="roll-btn"
          value={validatePointers(heldDice)}
          onClick={() => {
            if (!validatePointers(heldDice)) return
            scorePointers(currentScore)
            bankDice(heldDice)
            rollDice(diceToRoll)
          }}>
          Roll
          </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { heldDice, diceToRoll, currentScore } = state
  return { heldDice, diceToRoll, currentScore }
}

const countPointers = heldDice => {
  const pointers = [];
  for (let i = 1; i < 7; i++) pointers.push(heldDice.filter(d => d.value === i))
  return pointers.map(d => d.length)
}

const validatePointers = heldDice => {
  if (heldDice.length === 0) return false
  let valid = true;
  const pointers = countPointers(heldDice)
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
    bankDice: heldDice => {
      heldDice.forEach(d => d.status = `bank`)
      dispatch(setBankDice(heldDice))
      dispatch(setHeldDice([]))
    },
    scorePointers: currentScore => {
      dispatch(setTotalScore(currentScore))
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
