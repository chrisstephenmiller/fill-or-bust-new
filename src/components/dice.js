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
      turnScore: 0,
      totalScore: 0,
    }
  }

  componentDidMount = () => {
    this.rollDice()
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
    this.turnScore(heldDice);
  }

  bankHeldDice = () => {
    let { heldDice, bankedDice } = this.state
    heldDice.forEach(d => d.status = `banked`)
    bankedDice = [...heldDice, ...bankedDice]
    heldDice = [];
    this.setState({ heldDice, bankedDice })
    this.totalScore(bankedDice);
  }

  turnScore = heldDice => {
    let turnScore = 0;
    let ones = 100;
    let twos = 200/3;
    let threes = 100/3;
    let fours = 400/3;
    let fives = 50;
    let sixes = 200;
    heldDice.filter(d => d.value === 1).length === 3 && (ones = 1000/3)
    heldDice.filter(d => d.value === 1).length === 4 && (ones = 500)
    heldDice.filter(d => d.value === 2).length === 4 && (twos = 100)
    heldDice.filter(d => d.value === 3).length === 4 && (threes = 150)
    heldDice.filter(d => d.value === 4).length === 4 && (fours = 200)
    heldDice.filter(d => d.value === 5).length === 3 && (fives = 500/3)
    heldDice.filter(d => d.value === 5).length === 4 && (fives = 250)
    heldDice.filter(d => d.value === 6).length === 4 && (sixes = 300)
    heldDice.forEach(d => {
      if (d.value === 1) turnScore += ones;
      if (d.value === 2) turnScore += twos;
      if (d.value === 3) turnScore += threes;
      if (d.value === 4) turnScore += fours;
      if (d.value === 5) turnScore += fives;
      if (d.value === 6) turnScore += sixes;
    })
    if (turnScore % 50 !== 0) turnScore = 0;
    this.setState({ turnScore })
  }

  totalScore = () => {
    let { turnScore } = this.state
    const totalScore = this.state.totalScore += turnScore
    turnScore = 0;
    this.setState({ turnScore, totalScore })
  }

  rollDice = () => {
    this.bankHeldDice();
    const liveDice = [];
    for (let i = this.state.diceToRoll; i > 0; i--) { liveDice.push(this.die()) }
    this.setState({ liveDice })
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
          <button
            onClick={this.rollDice}
            id="roll-btn">
            Roll
          </button>
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dice;
