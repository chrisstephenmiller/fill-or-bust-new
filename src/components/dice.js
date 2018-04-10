import React, { Component } from 'react';
import { connect } from 'react-redux'
import { calcDice, calcCurrentScore } from '../reducers'

const dieImg = value => {
  return `https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${value}-256.png`
}

class Dice extends Component {
  render() {
    const { liveDice, heldDice, allDice, toggleDice, totalScore } = this.props
    return (
      <div id="all-dice">
        {allDice.map((d, i) => {
          return (
            <div key={d.name} className="dice-row">
              <h2 className="dice-name">{d.name}</h2>
              {d.dice.map((d, i) => {
                return (
                  <img
                    key={i} className="die-img"
                    src={dieImg(d.value)} alt={d.value}
                    onClick={() => {
                      toggleDice(d, liveDice, heldDice, totalScore)
                    }}>
                  </img>
                )
              })}
            </div>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { liveDice, heldDice, bankDice, totalScore } = state
  return {
    totalScore,
    liveDice,
    heldDice,
    allDice: [{ name: `Live`, dice: liveDice }, { name: `Held`, dice: heldDice }, { name: `Bank`, dice: bankDice }],
  }
}

const flipDice = d => {
  if (d.status === `bank`) return
  d.status = d.status === `live` ? `held` : `live`
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDice: (d, liveDice, heldDice, totalScore) => {
      flipDice(d)
      const allDice = [...liveDice, ...heldDice]
      liveDice = allDice.filter(d => d.status === `live`)
      heldDice = allDice.filter(d => d.status === `held`)
      dispatch(calcDice(liveDice, heldDice))
      dispatch(calcCurrentScore(heldDice, totalScore))
    },
  }
}

const DiceContainer = connect(mapStateToProps, mapDispatchToProps)(Dice)

export default DiceContainer
