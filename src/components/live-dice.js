import React, { Component } from 'react';

class LiveDice extends Component {
  constructor() {
    super()

    }

  componentDidMount = () => {
  }

  render() {
    const {liveDice, toggleDice} = this.props
    return (
        <div id="dice">
          <div id="live-dice">
            {liveDice.map((d, i) => {
              return (
                <img
                  width="50"
                  height="50"
                  src={`https://cdn2.iconfinder.com/data/icons/dice-roll/100/dice_${d.value}-256.png`}
                  key={`${i}-${d.value}`}
                  onClick={() => toggleDice(d)}
                  alt={d.value}>
                </img>
              )
            })}
          </div>
      </div>
    );
  }
}

export default LiveDice;
