import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setBankDice, setHeldDice, rollLiveDice, } from '../reducers'


class Roll extends Component {

  render() {
    const { heldDice, diceToRoll, bankDice, rollDice} = this.props
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
    heldDice: state.heldDice,
    diceToRoll: state.diceToRoll,
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

const RollContainer = connect(mapStateToProps, mapDispatchToProps)(Roll)

export default RollContainer
