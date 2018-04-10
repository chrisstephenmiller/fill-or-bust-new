import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setLiveDice, setHeldDice, setDiceToRoll } from '../reducers'

class HeldDice extends Component {
  render() {
    const { liveDice, heldDice, toggleDice } = this.props
    return (
      <div id="dice">
        <div id="held-dice">
          {heldDice.map((d, i) => {
            return (
              <img
                width="50"
                height="50"
                src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${d.value}-256.png`}
                key={`${i}-${d.value}`}
                onClick={() => toggleDice(d, liveDice, heldDice)}
                alt={d.value}>
              </img>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    liveDice: state.liveDice,
    heldDice: state.heldDice,
    currentScore: state.currentScore,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDice: (d, liveDice, heldDice) => {
      d.status = d.status === `live` ? `held` : `live`
      const allDice = [...liveDice, ...heldDice]
      liveDice = allDice.filter(d => d.status === `live`)
      heldDice = allDice.filter(d => d.status === `held`)
      dispatch(setLiveDice(liveDice))
      dispatch(setHeldDice(heldDice))
      dispatch(setDiceToRoll(liveDice.length))
    }
  }
}

const HeldDiceContainer = connect(mapStateToProps, mapDispatchToProps)(HeldDice)

export default HeldDiceContainer
