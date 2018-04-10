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

const SET_LIVE_DICE = `SET_LIVE_DICE`
const SET_HELD_DICE = `SET_HELD_DICE`
const SET_BANK_DICE = `SET_BANK_DICE`
const SET_DICE_TO_ROLL = `SET_DICE_TO_ROLL`
const SET_CURRENT_SCORE = `SET_CURRENT_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`

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

export const calcDice = (liveDice, heldDice) => {
  return dispatch => {
    dispatch(setLiveDice(liveDice))
    dispatch(setHeldDice(heldDice))
    dispatch(setDiceToRoll(liveDice.length))
  }
}

const countPointers = heldDice => {
  const pointers = [];
  for (let i = 1; i < 7; i++) pointers.push(heldDice.filter(d => d.value === i))
  return pointers.map(d => d.length)
}

const totalPointers = (pointers, currentScore) => {
  if (pointers[0] > 2) { currentScore += 250 * 2 ** (pointers[0] - 1) } else currentScore += 100 * pointers[0];
  if (pointers[1] > 2) currentScore += 50 * 2 ** (pointers[1] - 1)
  if (pointers[2] > 2) currentScore += 75 * 2 ** (pointers[2] - 1)
  if (pointers[3] > 2) currentScore += 100 * 2 ** (pointers[3] - 1)
  if (pointers[4] > 2) { currentScore += 125 * 2 ** (pointers[4] - 1) } else currentScore += 50 * pointers[4]
  if (pointers[5] > 2) currentScore += 150 * 2 ** (pointers[5] - 1)
  if (pointers.filter(p => p === 1).length === 6) currentScore = 1500
  return currentScore
}

export const calcCurrentScore = (heldDice, prevScore) => {
  const pointers = countPointers(heldDice)
  const currentScore = totalPointers(pointers, prevScore)
  return dispatch => {
    dispatch(setCurrentScore(currentScore))
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        ...state, totalScore: action.currentScore
      }
    default: return state
  }
}

export default reducer

