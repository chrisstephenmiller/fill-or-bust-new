const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
}

const rollDice = diceToRoll => {
  const liveDice = [];
  for (let i = diceToRoll; i > 0; i--) { liveDice.push(rollDie()) }
  return liveDice
}

const initialState = {
  liveDice: rollDice(6),
  heldDice: [],
  bankDice: [],
  diceToRoll: 6,
  currentScore: 0,
  totalScore: 0,
}

const ROLL_LIVE_DICE = `ROLL_LIVE_DICE`
const SET_LIVE_DICE = `SET_LIVE_DICE`
const SET_HELD_DICE = `SET_HELD_DICE`
const SET_BANK_DICE = `SET_BANK_DICE`
const SET_DICE_TO_ROLL = `SET_DICE_TO_ROLL`
const SET_CURRENT_SCORE = `SET_CURRENT_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`

export const rollLiveDice = liveDice => {
  return {
    type: ROLL_LIVE_DICE,
    liveDice
  }
}
export const setLiveDice = liveDice => {
  return {
    type: SET_LIVE_DICE,
    liveDice
  }
}
export const setHeldDice = heldDice => {
  return {
    type: SET_HELD_DICE,
    heldDice
  }
}
export const setBankDice = heldDice => {
  return {
    type: SET_BANK_DICE,
    heldDice
  }
}
export const setDiceToRoll = diceToRoll => {
  return {
    type: SET_DICE_TO_ROLL,
    diceToRoll
  }
}
export const setCurrentScore = currentScore => {
  return {
    type: SET_CURRENT_SCORE,
    currentScore
  }
}
export const setTotalScore = currentScore => {
  return {
    type: SET_TOTAL_SCORE,
    currentScore
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLL_LIVE_DICE:
      return {
        ...state, liveDice: action.liveDice
      }
      case SET_LIVE_DICE:
      return {
        ...state, liveDice: action.liveDice
      }
      case SET_HELD_DICE:
        return {
          ...state, heldDice: action.heldDice
        }
    case SET_BANK_DICE:
      return {
        ...state, bankDice: [...state.bankDice, ...action.heldDice]
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

