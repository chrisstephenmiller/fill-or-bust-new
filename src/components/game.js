import React, { Component } from 'react';
import LiveDice from './live-dice'
import HeldDice from './held-dice'
import BankedDice from './banked-dice'
import Roll from './roll'

class Game extends Component {

  render() {
    return (
      <div id="game">
        <div id="dice">
          <div className="dice-row">
            <h2>Live Dice</h2>
            <LiveDice />
          </div>
          <div className="dice-row">
            <h2>Held Dice</h2>
            <HeldDice />
          </div>
          <div className="dice-row">
            <h2>Banked Dice</h2>
            <BankedDice />
          </div>
        </div>
        <Roll />
      </div>
    );
  }
}

export default Game
