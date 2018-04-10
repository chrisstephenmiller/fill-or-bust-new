import React, { Component } from 'react';
import { connect } from 'react-redux'
import { rollLiveDice, setBankDice, setHeldDice, setDiceToRoll } from '../reducers'

class Dice extends Component {
  constructor() {
    super()

    this.state = {
      liveDice: [],
      heldDice: [],
      bankedDice: [],
      diceToRoll: 6,
      currentScore: 0,
      totalScore: 0,
    }
  }

  render() {
    const { rollDice, diceToRoll, heldDice, bankDice } = this.props
    return (
      <div id="roll-btn">
        <button
          onClick={() => {
            bankDice(heldDice)

            rollDice(diceToRoll)
          }}>
          Roll
          </button>
        <h3 id="pointer-error" className={`pointer-error`}>Pointers are not valid</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    liveDice: state.liveDice,
    heldDice: state.heldDice,
    diceToRoll: state.diceToRoll
  }
}

const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
}

const mapDispatchToProps = dispatch => {
  return {
    bankDice: heldDice => {
      heldDice.forEach(d => d.status = `banked`)
      dispatch(setBankDice(heldDice))
      dispatch(setHeldDice([]))
    },
    rollDice: diceToRoll => {
      const liveDice = [];
      for (let i = diceToRoll; i > 0; i--) { liveDice.push(rollDie()) }
      dispatch(rollLiveDice(liveDice))
    },
  }
}

const DiceContainer = connect(mapStateToProps, mapDispatchToProps)(Dice)

export default DiceContainer
