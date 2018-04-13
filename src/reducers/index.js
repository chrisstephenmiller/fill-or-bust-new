const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
}

const rollDice = numToRoll => {
  const dice = [];
  for (let i = numToRoll; i > 0; i--) { dice.push(rollDie()) }
  return dice
}

const flipDiceStatus = (i, dice) => {
  const newDice = [...dice]
  newDice[i].status = newDice[i].status === `live` ? `held` : `live`
  return newDice
}

export const toggleDiceState = (i, dice) => {
  const newDice = flipDiceStatus(i, dice)
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

export const rollLiveDice = dice => {
  const newDice = dice.map(d => d.status === `live` ? rollDie() : d)
  console.log(newDice)
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

const initialState = {
  dice: rollDice(6),
  turnScore: 0,
  totalScore: 0,
}

const SET_DICE = `SET_DICE`
const SET_TURN_SCORE = `SET_TURN_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`

export const setDice = dice => {
  return {
    type: SET_DICE,
    dice
  }
}
export const setTurnScore = score => {
  return {
    type: SET_TURN_SCORE,
    score
  }
}
export const setTotalScore = score => {
  return {
    type: SET_TOTAL_SCORE,
    score
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DICE:
      return {
        ...state, dice: action.dice
      }
    case SET_TURN_SCORE:
      return {
        ...state, turnScore: action.score
      }
    case SET_TOTAL_SCORE:
      return {
        ...state, totalScore: action.score
      }
    default: return state
  }
}

export default reducer