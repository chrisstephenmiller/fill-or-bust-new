import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleDiceStatus, calcRollScore } from '../reducers'

const dieImg = value => {
  return `https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${value}-256.png`
}

class Dice extends Component {
  render() {
    const { dice, toggleDiceStatus, calcRollScore } = this.props
    return <div className="dice">
      {dice.map((d, i) => {
        return (
          <div key={i}>
            <img
              className="die-img"
              src={dieImg(d.value)} alt={d.value}
              onClick={() => {
                if (d.status === `bank`) return
                toggleDiceStatus(i, dice)
                calcRollScore(dice)
              }}>
            </img>
            <h4>{d.status}</h4>
          </div>
        )
      })}
    </div>
  }
}

const mapStateToProps = state => {
  const { dice } = state
  return { dice }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDiceStatus: (i, dice) => {
      dispatch(toggleDiceStatus(i, dice))
    },
    calcRollScore: dice => {
      dispatch(calcRollScore(dice))
    },
  }
}

const DiceContainer = connect(mapStateToProps, mapDispatchToProps)(Dice)

export default DiceContainer