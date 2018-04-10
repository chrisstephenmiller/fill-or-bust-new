import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setLiveDice, setHeldDice, setDiceToRoll } from '../reducers'

class LiveDice extends Component {
  constructor() {
    super()
  }

  render() {
    const { liveDice, heldDice, toggleDice } = this.props
    return (
      <div id="dice">
        <div id="live-dice">
          {liveDice.map((d, i) => {
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

const LiveDiceContainer = connect(mapStateToProps, mapDispatchToProps)(LiveDice)

export default LiveDiceContainer
