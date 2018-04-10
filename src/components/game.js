import React, { Component } from 'react';
import Dice from './dice'
import Roll from './roll'
import Score from './score'

class Game extends Component {

  render() {
    return (
      <div id="game">
        <Dice />
        <Roll />
        <Score />
      </div>
    );
  }
}

export default Game
