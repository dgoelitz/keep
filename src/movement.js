import { useStateValue } from './StateContext';
import { BOARD } from './constants';
import { ContinueGame } from './gameFlow';
import { PassTurn } from './gameMechanics';
import { RollAllDice } from './randomizers';
import { Discard } from './discardCard';

export function MoveSpaceEvent(event) {
  const { 
    playerTurn,
    dice,
    setDice
  } = useStateValue();

  const moveNumber = parseInt(event.key);
  if (moveNumber < 1 || moveNumber > 6 || Number.isNaN(moveNumber)) return;
  let moveDiceIndex = dice[playerTurn - 1].indexOf(moveNumber);
  if (moveDiceIndex === -1) {
    console.log(`You do not have a ${moveNumber} dice.`);
    return;
  }

  let tempDice = dice.slice()

  tempDice[playerTurn - 1].splice(moveDiceIndex, 1);
  if (tempDice[playerTurn]) tempDice[playerTurn].push(moveNumber);
  else tempDice[0].push(moveNumber);
  setDice(tempDice);

  document.removeEventListener("keyup", MoveSpaceEvent);
  SetBoardPosition(moveNumber);
}

function SetBoardPosition(moveNumber) {
  const {
    playerTurn,
    spaces
  } = useStateValue();

  spaces[playerTurn - 1] += moveNumber;

  if (spaces[playerTurn - 1] > 15) {
    spaces[playerTurn - 1] -= 16;
    resetHandSize(moveNumber);
    return;
  }

  console.log(`Player ${playerTurn} moved ${moveNumber} space(s) and landed on a ${BOARD[spaces[playerTurn - 1]]} space.`);
  LandOnSpace();
}

export function LandOnSpace() {
  const {
    playerTurn,
    spaces,
    lost
  } = useStateValue();

  switch (BOARD[spaces[playerTurn - 1]]) {
    case "w":
      playSwordCard();
      break;
    case "h":
      playShieldCard();
      break;
    case "b":
      playBootsCard();
      break;
    case "start":
      PassTurn();
      ContinueGame();
      break;
    case "reroll":
      PassTurn();
      RollAllDice(playerTurn);
      ContinueGame();
      break;
    case "discard":
      Discard(playerTurn);
      if (!lost[playerTurn - 1])
        PassTurn();
      break;
    case "adjust":
      adjustDice();
      break;
    default:
      throw new Error(`${BOARD[spaces[playerTurn - 1]]} is not a valid space.`)
  }
}