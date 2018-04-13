import React, { Component } from 'react';
import Dice from './dice'
import Roll from './roll'

class Game extends Component {

  render() {
    return (
      <div id="game">
        <Dice />
        <Roll />
      </div>
    );
  }
}

export default Game
