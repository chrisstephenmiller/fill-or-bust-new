import React, { Component } from 'react';
import { connect } from 'react-redux'
import { rollLiveDice } from '../reducers'

class Roll extends Component {
  render() {
    const { dice, rollLiveDice } = this.props
    return <div id="roll">
      <button
        id="roll-btn"
        onClick={() => rollLiveDice(dice)}>
        Roll
      </button>
    </div>
  }
}

const mapStateToProps = state => {
  const { dice } = state
  return {
    dice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rollLiveDice: dice => {
      dispatch(rollLiveDice(dice))
    }
  }
}

const RollContainer = connect(mapStateToProps, mapDispatchToProps)(Roll)

export default RollContainer