// ROLLING
const rollDie = () => {
  return { value: Math.floor(Math.random() * 6 + 1), status: `live`, isPointer: false }
}

export const rollNewDice = dice => {
  const newDice = [];
  for (let i = 6; i > 0; i--) {
    const die = rollDie()
    newDice.push(die)
  }
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

export const rollLiveDice = dice => {
  const newDice = dice.map(d => d.status === `live` ? rollDie() : d)
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

// HOLDING
const flipLiveHeldStatus = (i, dice) => {
  const newDice = [...dice]
  newDice[i].status = newDice[i].status === `live` ? `held` : `live`
  return newDice
}

export const toggleDiceStatus = (i, dice) => {
  const newDice = flipLiveHeldStatus(i, dice)
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

//BANKING
const flipHeldBankStatus = dice => {
  const newDice = dice.map(d => {
    d.status === `held` && (d.status = `bank`)
    return d
  })
  return newDice
}

export const bankHeldDice = dice => {
  const newDice = flipHeldBankStatus(dice)
  return dispatch => {
    dispatch(setDice(newDice))
  }
}

//SCORING
const countAllPointers = dice => {
  const pointers = [0, 0, 0, 0, 0, 0]
  dice.forEach(d => pointers[d.value - 1]++)
  return pointers
}

const countLivePointers = dice => {
  const pointers = [0, 0, 0, 0, 0, 0]
  const heldDice = dice.filter(d => d.status === 'live')
  heldDice.forEach(d => pointers[d.value - 1]++)
  return pointers
}

const countHeldPointers = dice => {
  const pointers = [0, 0, 0, 0, 0, 0]
  const heldDice = dice.filter(d => d.status === 'held')
  heldDice.forEach(d => pointers[d.value - 1]++)
  return pointers
}

const calcPointers = pointers => {
  let rollScore = 0;
  pointers[0] > 2 ? rollScore += 1000 * (pointers[0] - 2) : rollScore += 100 * pointers[0];
  pointers[1] > 2 && (rollScore += 200 * (pointers[1] - 2))
  pointers[2] > 2 && (rollScore += 300 * (pointers[2] - 2))
  pointers[3] > 2 && (rollScore += 400 * (pointers[3] - 2))
  pointers[4] > 2 ? rollScore += 500 * (pointers[4] - 2) : rollScore += 50 * pointers[4]
  pointers[5] > 2 && (rollScore += 600 * (pointers[5] - 2))
  pointers.filter(p => p === 1).length === 6 && (rollScore = 1500)
  return rollScore
}

export const calcRollScore = dice => {
  const pointers = countHeldPointers(dice)
  const newRollScore = calcPointers(pointers)
  return dispatch => {
    dispatch(setRollScore(newRollScore))
  }
}

export const calcTurnScore = (rollScore, turnScore) => {
  const newTurnScore = rollScore + turnScore
  return dispatch => {
    dispatch(setTurnScore(newTurnScore))
    dispatch(setRollScore(0))
  }
}

export const calcTotalScore = (rollScore, turnScore, totalScore) => {
  const newTotalScore = rollScore + turnScore + totalScore
  return dispatch => {
    dispatch(setTotalScore(newTotalScore))
    dispatch(setTurnScore(0))
    dispatch(setRollScore(0))
  }
}

//FILL-OR-BUST
export const fillOrBust = dice => {
  let state = 'live'
  const livePointers = countLivePointers(dice)
  const allPointers = countAllPointers(dice)
  let fill = livePointers.map((p, i) => {
    if ((i === 0 || i === 4) && p > 0) return true
    else if (p === 0 || p > 2) return true
    else return false
  })
  if (allPointers.filter(p => p === 1).length === 6) fill = true
  const bust = livePointers.map((p, i) => {
    if ((i === 0 || i === 4) && p > 0) return false
    else if (p > 2) return false
    else return true
  })
  if (fill.filter(f => f).length === 6) state = `fill`
  if (bust.filter(f => f).length === 6) state = `bust`
  return dispatch => {
    dispatch(setTurnState(state))
  }
}

export const incrementRolls = numRolls => {
  const newNumRolls = numRolls + 1
  return dispatch => {
    dispatch(setNumRolls(newNumRolls))
  }
}

// [rollDie(), rollDie(), rollDie(), rollDie(), rollDie(), rollDie()]
const initialState = {
  dice: [],
  rollScore: 0,
  turnScore: 0,
  totalScore: 0,
  turnState: `live`,
  numRolls: 0,
}

const SET_DICE = `SET_DICE`
const SET_ROLL_SCORE = `SET_ROLL_SCORE`
const SET_TURN_SCORE = `SET_TURN_SCORE`
const SET_TOTAL_SCORE = `SET_TOTAL_SCORE`
const SET_TURN_STATE = `SET_TURN_STATE`
const SET_NUM_ROLLS = `SET_NUM_ROLLS`

const setDice = dice => {
  return {
    type: SET_DICE,
    dice
  }
}

const setRollScore = score => {
  return {
    type: SET_ROLL_SCORE,
    score
  }
}

const setTurnScore = score => {
  return {
    type: SET_TURN_SCORE,
    score
  }
}

const setTotalScore = score => {
  return {
    type: SET_TOTAL_SCORE,
    score
  }
}

const setTurnState = state => {
  return {
    type: SET_TURN_STATE,
    state
  }
}

const setNumRolls = rolls => {
  return {
    type: SET_NUM_ROLLS,
    rolls
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DICE:
      return {
        ...state, dice: action.dice
      }
    case SET_ROLL_SCORE:
      return {
        ...state, rollScore: action.score
      }
    case SET_TURN_SCORE:
      return {
        ...state, turnScore: action.score
      }
    case SET_TOTAL_SCORE:
      return {
        ...state, totalScore: action.score
      }
    case SET_TURN_STATE:
      return {
        ...state, turnState: action.state
      }
    case SET_NUM_ROLLS:
      return {
        ...state, numRolls: action.rolls
      }
    default: return state
  }
}

export default reducer
