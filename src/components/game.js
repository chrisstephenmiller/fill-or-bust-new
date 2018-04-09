import React, { Component } from 'react';

import Dice from './dice'

class Game extends Component {

  render() {
    return (
      <div className="game">
        <Dice />
      </div>
    );
  }
}

export default Game;
