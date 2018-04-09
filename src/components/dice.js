import React, { Component } from 'react';
import LiveDice from './live-dice';
import HeldDice from './held-dice';
import BankedDice from './banked-dice';

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

  componentDidMount = () => {
    const liveDice = [];
    for (let i = this.state.diceToRoll; i > 0; i--) { liveDice.push(this.die()) }
    this.setState({ liveDice })
  }

  die = () => {
    return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
  }

  toggleDice = d => {
    let { liveDice, heldDice } = this.state
    d.status = d.status === `live` ? `held` : `live`
    const allDice = [...liveDice, ...heldDice]
    liveDice = allDice.filter(d => d.status === `live`)
    heldDice = allDice.filter(d => d.status === `held`)
    const diceToRoll = liveDice.length
    this.setState({ liveDice, heldDice, diceToRoll })
    this.currentScore(heldDice);
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

  bankDice = () => {
    let { heldDice, bankedDice } = this.state
    heldDice.forEach(d => d.status = `banked`)
    bankedDice = [...heldDice, ...bankedDice]
    heldDice = [];
    this.setState({ heldDice, bankedDice })
    this.totalScore()
  }

  totalScore = () => {
    const totalScore = this.state.currentScore
    this.setState({ totalScore })
  }

  rollDice = () => {
    if (!this.validatePointers()) { document.getElementById('pointer-error').classList.add(`visible`) }
    else {
      this.bankDice();
      const liveDice = [];
      for (let i = this.state.diceToRoll; i > 0; i--) { liveDice.push(this.die()) }
      this.setState({ liveDice })
    }
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
    console.log(`render-state:`, this.state)
    const { liveDice, heldDice, bankedDice } = this.state
    return (
      <div id="game">
        <div id="dice">
          <div className="dice-row">
            <h2>Live Dice</h2>
            <LiveDice id="live-dice" liveDice={liveDice} toggleDice={this.toggleDice} />
          </div>
          <div className="dice-row">
            <h2>Held Dice</h2>
            <HeldDice id="held-dice" heldDice={heldDice} toggleDice={this.toggleDice} />
          </div>
          <div className="dice-row">
            <h2>Banked Dice</h2>
            <BankedDice id="banked-dice" bankedDice={bankedDice} />
          </div>
          <div id="roll-btn">
            <button
              value={this.validatePointers()}
              onClick={this.rollDice}>
              Roll
          </button>
            <h3 id="pointer-error" className={`pointer-error`} value={this.validatePointers()}>Pointers are not valid</h3>
          </div>
          <div>
            <h1>Current score: {this.state.currentScore}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Dice;
