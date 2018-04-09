import React, { Component } from 'react';

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
    const {liveDice, heldDice, bankedDice} = this.state
    return (
      <div id="game">
        <div id="dice">
          <div id="live-dice">
            {liveDice.map((d, i) => {
              return (
                <img
                  width="50"
                  height="50"
                  src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${d.value}-256.png`}
                  key={`${i}-${d.value}`}
                  onClick={() => this.toggleDice(d)}
                  alt={d.value}>
                </img>
              )
            })}
          </div>
          <div id="held-dice">
            {heldDice.map((d, i) => {
              return (
                <img
                  width="50"
                  height="50"
                  src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${d.value}-256.png`}
                  key={`${i}-${d.value}`}
                  className='held'
                  onClick={() => this.toggleDice(d)}
                  alt={d.value}>
                </img>
              )
            })}
          </div>
          <div id="banked-dice">
            {bankedDice.map((d, i) => {
              return (
                <img
                  width="50"
                  height="50"
                  src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${d.value}-256.png`}
                  key={`${i}-${d.value}`}
                  className='banked'
                  alt={d.value}>
                </img>
              )
            })}
          </div>
        </div>
        <button
          onClick={this.rollDice}
          id="roll-btn">
          Roll
        </button>
      </div>
    );
  }
}

export default Dice;
