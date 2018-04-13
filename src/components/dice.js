import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleDiceState } from '../reducers'

const dieImg = value => {
  return `https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${value}-256.png`
}

class Dice extends Component {
  render() {
    const { dice, toggleDiceState } = this.props
    return <div className="dice">
      {dice.map((d, i) => {
        return (
          <div key={i}>
            <img
              className="die-img"
              src={dieImg(d.value)} alt={d.value}
              onClick={() => toggleDiceState(i, dice)}>
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
    toggleDiceState: (i, dice) => {
      dispatch(toggleDiceState(i, dice))
    }
  }
}

const DiceContainer = connect(mapStateToProps, mapDispatchToProps)(Dice)

export default DiceContainer