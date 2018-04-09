import React, { Component } from 'react';

class Dice extends Component {
  constructor() {
    super()

    this.state = {
      diceToRoll: 6,
      liveDice: [],
      heldDice: [],
    }
  }

  componentDidMount = () => {
    this.rollDice()
  }

  die = () => {
    return Math.floor(Math.random() * 6 + 1)
  }

  rollDice = () => {
    const d = this.state.diceToRoll
    const liveDice = []
    for (let i = d; i > 0; i--) { liveDice.push(this.die()) }
    this.setState({ liveDice })
  }

  holdDice = event => {
    event.target.classList.toggle('held')
    const dice = Array.from(document.getElementById('live-dice').children).concat(Array.from(document.getElementById('held-dice').children))
    console.log(dice)
    const heldDice = dice.map(die => die.className === 'held' && +die.innerHTML).filter(d => d !== false)
    const liveDice = dice.map(die => die.className !== 'held' && +die.innerHTML).filter(d => d !== false)
    const diceToRoll = dice.length - heldDice.length
    this.setState({ heldDice, liveDice, diceToRoll })
  }

  render() {
    console.log(this.state)
    return (
      <div id="game">
        <div id="dice">
          <div id="live-dice">
            {this.state.liveDice.map((d, i) => {
              return (
                <h1
                  key={`${i}-${d}`}
                  value={d}
                  onClick={this.holdDice}>
                  {d}
                </h1>
              )
            })}
          </div>
          <div id="held-dice">
            {this.state.heldDice.map((d, i) => {
              return (
                <h1
                  key={`${i}-${d}`}
                  value={d}
                  className="held"
                  onClick={this.holdDice}>
                  {d}
                </h1>
              )
            })}
          </div>
        </div>
        <button
          id="roll-btn">
          Roll
        </button>
      </div>
    );
  }
}

export default Dice;
