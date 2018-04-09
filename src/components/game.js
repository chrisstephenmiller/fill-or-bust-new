import React, { Component } from 'react';

import Dice from './dice'

class Game extends Component {
  constructor() {
    super()

    this.state = {
      turn: 0,
    }
  }

  render() {
    return (
      <div className="game">
        <Dice />
      </div>
    );
  }
}

export default Game;
