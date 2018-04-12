const initialState = {
  liveDice: [],
  heldDice: [],
  bankDice: [],
  diceToRoll: 6,
  rollScore: 0,
  turnScore: 0,
  totalScore: 0,
  turn: 1,
}

const SET_LIVE_DICE = `SET_LIVE_DICE`
const SET_HELD_DICE = `SET_HELD_DICE`
const SET_BANK_DICE = `SET_BANK_DICE`
const SET_DICE_TO_ROLL = `SET_DICE_TO_ROLL`
const SET_ROLL_SCORE = `SET_ROLL_SCORE`
const SET_TURN_SCORE = `SET_TURN_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`
const SET_TURN = `SET_TURN`

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
export const setBankDice = bankDice => {
  return {
    type: SET_BANK_DICE,
    bankDice
  }
}
export const setDiceToRoll = diceToRoll => {
  return {
    type: SET_DICE_TO_ROLL,
    diceToRoll
  }
}
export const setRollScore = rollScore => {
  return {
    type: SET_ROLL_SCORE,
    rollScore
  }
}
export const setTurnScore = rollScore => {
  return {
    type: SET_TURN_SCORE,
    rollScore
  }
}
export const setTotalScore = turnScore => {
  return {
    type: SET_TOTAL_SCORE,
    turnScore
  }
}
export const setTurn = turn => {
  return {
    type: SET_TURN,
    turn
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
        ...state, bankDice: action.bankDice
      }
    case SET_DICE_TO_ROLL:
      return {
        ...state, diceToRoll: action.diceToRoll
      }
    case SET_ROLL_SCORE:
      return {
        ...state, rollScore: action.rollScore
      }
    case SET_TURN_SCORE:
      return {
        ...state, turnScore: action.rollScore
      }
    case SET_TOTAL_SCORE:
      return {
        ...state, totalScore: state.totalScore + action.turnScore
      }
    case SET_TURN:
      return {
        ...state, turn: action.turn
      }
    default: return state
  }
}

export default reducer

const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live` }
}

const rollDice = diceToRoll => {
  const liveDice = [];
  for (let i = diceToRoll; i > 0; i--) { liveDice.push(rollDie()) }
  return liveDice
}

export const setDice = (liveDice, heldDice) => {
  return dispatch => {
    dispatch(setLiveDice(liveDice))
    dispatch(setHeldDice(heldDice))
    dispatch(setDiceToRoll(liveDice.length))
  }
}

export const calcHeldPointers = heldDice => {
  const pointers = [];
  for (let i = 1; i < 7; i++) pointers.push(heldDice.filter(d => d.value === i))
  return pointers.map(d => d.length)
}

const calcPointerScore = pointers => {
  let rollScore = 0;
  if (pointers[0] > 2) { rollScore += 250 * 2 ** (pointers[0] - 1) } else rollScore += 100 * pointers[0];
  if (pointers[1] > 2) rollScore += 50 * 2 ** (pointers[1] - 1)
  if (pointers[2] > 2) rollScore += 75 * 2 ** (pointers[2] - 1)
  if (pointers[3] > 2) rollScore += 100 * 2 ** (pointers[3] - 1)
  if (pointers[4] > 2) { rollScore += 125 * 2 ** (pointers[4] - 1) } else rollScore += 50 * pointers[4]
  if (pointers[5] > 2) rollScore += 150 * 2 ** (pointers[5] - 1)
  if (pointers.filter(p => p === 1).length === 6) rollScore = 1500
  return rollScore
}

export const calcRollStore = heldDice => {
  const pointers = calcHeldPointers(heldDice)
  const rollScore = calcPointerScore(pointers)
  return dispatch => {
    dispatch(setRollScore(rollScore))
  }
}

export const incrementTurn = turn => {
  turn++
  return dispatch => {
    dispatch(setTurn(turn))
  }
}