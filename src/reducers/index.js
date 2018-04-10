const initialState = {
  liveDice: [],
  heldDice: [],
  bankedDice: [],
  diceToRoll: 6,
  currentScore: 0,
  totalScore: 0,
}

const ROLL_DICE = `ROLL_DICE`
const HOLD_DICE = `HOLD_DICE`
const UNHOLD_DICE = `HOLD_DICE`
const BANK_DICE = `BANK_DICE`
const SET_DICE_TO_ROLL = `SET_DICE_TO_ROLL`
const SET_CURRENT_SCORE = `SET_CURRENT_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`

const rollDice = liveDice => {
  return {
    type: ROLL_DICE,
    liveDice
  }
}
const holdDice = (liveDice, heldDice) => {
  return {
    type: HOLD_DICE,
    liveDice,
    heldDice
  }
}
const unholdDice = (liveDice, heldDice) => {
  return {
    type: UNHOLD_DICE,
    liveDice,
    heldDice
  }
}
const bankDice = heldDice => {
  return {
    type: BANK_DICE,
    heldDice
  }
}
const setDiceToRoll = diceToRoll => {
  return {
    type: SET_DICE_TO_ROLL,
    diceToRoll
  }
}
const setCurrentScore = currentScore => {
  return {
    type: SET_CURRENT_SCORE,
    currentScore
  }
}
const setTotalScore = currentScore => {
  return {
    type: SET_TOTAL_SCORE,
    currentScore
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLL_DICE:
      return {
        ...state, liveDice: action.liveDice
      }
    case HOLD_DICE:
      return {
        ...state, liveDice: action.liveDice, heldDice: action.heldDice
      }
    case UNHOLD_DICE:
      return {
        ...state, liveDice: action.liveDice, heldDice: action.heldDice
      }
    case BANK_DICE:
      return {
        ...state, bankedDice: [...state.bankedDice, action.heldDice]
      }
    case SET_DICE_TO_ROLL:
      return {
        ...state, diceToRoll: action.diceToRoll
      }
    case SET_CURRENT_SCORE:
      return {
        ...state, currentScore: action.currentScore
      }
    case SET_TOTAL_SCORE:
      return {
        ...state, totalScore: state.totalScore + action.currentScore
      }
    default: return state
  }
}

export default reducer
