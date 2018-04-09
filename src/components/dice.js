import React, { Component } from 'react';
import BankedDice from './banked-dice';
import LiveDice from './live-dice';
import HeldDice from './held-dice';

class Dice extends Component {
  constructor() {
    super()

    this.state = {
      liveDice: [],
      heldDice: [],
      bankedDice: [],
      diceToRoll: 6,
    }
  }

  componentDidMount = () => {
    this.rollDice()
  }

  die = () => {
    return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
  }

  rollDice = () => {
    let { heldDice, bankedDice, diceToRoll } = this.state
    heldDice.forEach(d => d.status = `banked`)
    const allDice = [...heldDice, ...bankedDice]
    bankedDice = allDice.filter(d => d.status === `banked`)
    heldDice = allDice.filter(d => d.status === `held`)
    const liveDice = []
    for (let i = diceToRoll; i > 0; i--) { liveDice.push(this.die()) }
    this.setState({ liveDice, heldDice, bankedDice })
  }

  toggleDice = d => {
    let { liveDice, heldDice } = this.state
    d.status = d.status === `live` ? `held` : `live`
    const allDice = [...liveDice, ...heldDice]
    liveDice = allDice.filter(d => d.status === `live`)
    heldDice = allDice.filter(d => d.status === `held`)
    const diceToRoll = liveDice.length
    this.setState({ liveDice, heldDice, diceToRoll })
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
        </div>
      </div>
    );
  }
}

export default Dice;
