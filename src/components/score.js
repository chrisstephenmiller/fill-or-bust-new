import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCurrentScore } from '../reducers'

class Score extends Component {

  // totalScore = () => {
  //   const totalScore = this.state.currentScore
  //   this.setState({ totalScore })
  // }

  // validatePointers = () => {
  //   const { heldDice, currentScore } = this.props
  //   if (heldDice.length === 0) return false
  //   let valid = true;
  //   const pointers = this.countPointers(heldDice)
  //   pointers.forEach((p, i) => {
  //     if (p > 0 && p < 3 && (i + 1 !== 1 && i + 1 !== 5))
  //       valid = false;
  //   })
  //   if (valid) { document.getElementById('pointer-error').classList.remove(`visible`) }
  //   return valid
  // }


  render() {
    const { currentScore, heldDice } = this.props
    // setCurrentScore(heldDice)
    return (
      <div id="score">
        <h1>Current score: {currentScore} </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {heldDice, currentScore, totalScore} = state
  return {
    heldDice,
    currentScore,
    totalScore,
  }
}

const countPointers = heldDice => {
  const pointers = [];
  for (let i = 1; i < 7; i++) pointers.push(heldDice.filter(d => d.value === i))
  return pointers.map(d => d.length)
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentScore: (heldDice, currentScore) => {
      const pointers = countPointers(heldDice)
      if (pointers[0] > 2) { currentScore += 250 * 2 ** (pointers[0] - 1) } else currentScore += 100 * pointers[0];
      if (pointers[1] > 2) currentScore += 50 * 2 ** (pointers[1] - 1)
      if (pointers[2] > 2) currentScore += 75 * 2 ** (pointers[2] - 1)
      if (pointers[3] > 2) currentScore += 100 * 2 ** (pointers[3] - 1)
      if (pointers[4] > 2) { currentScore += 125 * 2 ** (pointers[4] - 1) } else currentScore += 50 * pointers[4]
      if (pointers[5] > 2) currentScore += 150 * 2 ** (pointers[5] - 1)
      if (pointers.filter(p => p === 1).length === 6) currentScore = 1500
      // dispatch(setCurrentScore(currentScore))
      // this.validatePointers()
    }
  }
}

const ScoreContainer = connect(mapStateToProps, mapDispatchToProps)(Score)

export default ScoreContainer
