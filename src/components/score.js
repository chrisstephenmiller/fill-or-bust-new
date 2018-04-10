import React, { Component } from 'react';
import LiveDice from './live-dice';
import HeldDice from './held-dice';
import BankedDice from './banked-dice';
import { connect } from 'react-redux'

class Dice extends Component {
  constructor() {
    super()

  }

  countPointers = heldDice => {
    const pointers = []
    for (let i = 1; i < 7; i++) pointers.push(heldDice.filter(d => d.value === i))
    return pointers.map(d => d.length)
  }

  currentScore = heldDice => {
    let currentScore = this.state.totalScore;
    const pointers = this.countPointers(heldDice)
    if (pointers[0] > 2) { currentScore += 250 * 2 ** (pointers[0] - 1) } else currentScore += 100 * pointers[0];
    if (pointers[1] > 2) currentScore += 50 * 2 ** (pointers[1] - 1)
    if (pointers[2] > 2) currentScore += 75 * 2 ** (pointers[2] - 1)
    if (pointers[3] > 2) currentScore += 100 * 2 ** (pointers[3] - 1)
    if (pointers[4] > 2) { currentScore += 125 * 2 ** (pointers[4] - 1) } else currentScore += 50 * pointers[4]
    if (pointers[5] > 2) currentScore += 150 * 2 ** (pointers[5] - 1)
    if (pointers.filter(p => p === 1).length === 6) currentScore = 1500
    this.setState({ currentScore })
    this.validatePointers()
  }

  totalScore = () => {
    const totalScore = this.state.currentScore
    this.setState({ totalScore })
  }

  validatePointers = () => {
    const { heldDice } = this.state
    if (heldDice.length === 0) return false
    let valid = true;
    const pointers = this.countPointers(heldDice)
    pointers.forEach((p, i) => {
      if (p > 0 && p < 3 && (i + 1 !== 1 && i + 1 !== 5))
        valid = false;
    })
    if (valid) { document.getElementById('pointer-error').classList.remove(`visible`) }
    return valid
  }


  render() {
    return (
          <div id="score">
            <h1>Current score: {this.state.currentScore}</h1>
          </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentScore: 0,
    totalScore: 0,
  }
}
const mapDispatchToProps = dispatch => { }

const DiceContainer = connect(mapStateToProps, mapDispatchToProps)(Dice)

export default DiceContainer
