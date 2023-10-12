import { useStateValue } from './StateContext';
import { ContinueGame } from './gameFlow';
import { PassTurn } from './gameMechanics';

export function AdjustDice() {
  const {
    playerTurn,
    lost,
    dice
  } = useStateValue();

  console.log(`Player ${playerTurn} will adjust one dice.`);
  let diceAdjustIndex = 1;
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice[i].length; j++) {
      if (!lost[i]) {
        console.log(`Press ${diceAdjustIndex} to change player ${i + 1}'s ${dice[i][j]} dice.`);
      }
      diceAdjustIndex++;
    }
  }
  document.addEventListener("keyup", SelectAdjustDiceEvent);
}

function SelectAdjustDiceEvent(event) {
  const {
    players,
    setSelectedDice,
    dice,
    lost
  } = useStateValue();

  const diceNumber = parseInt(event.key);
  if (diceNumber < 1 || diceNumber > 9 || Number.isNaN(diceNumber)) return;

  if (players < 4 && diceNumber > 7) {
    console.log(`There are less than 4 players. There is no dice number ${diceNumber}.`);
    return;
  }
  if (players < 3 && diceNumber > 5) {
    console.log(`There are less than 3 players. There is no dice number ${diceNumber}.`);
    return;
  }

  let diceAdjustIndex = 1;
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice[i].length; j++) {
      if (diceAdjustIndex === diceNumber && lost[i]) {
        console.log(`Player ${i + 1} has already lost the game and their dice cannot be changed.`);
        return;
      }
      diceAdjustIndex++;
    }
  }

  console.log("Press the number that you would like to change the dice to.");
  setSelectedDice(diceNumber);
  document.removeEventListener("keyup", SelectAdjustDiceEvent);
  document.addEventListener("keyup", ChangeDiceEvent);
}

function ChangeDiceEvent(event) {
  const {
    playerTurn,
    selectedDice,
    dice
  } = useStateValue();

  const changeNumber = parseInt(event.key);
  if (changeNumber < 1 || changeNumber > 6 || Number.isNaN(changeNumber)) return;
  let diceAdjustIndex = 1;
  for (let i = 0; i < dice.length; i++) {
    for (let j = 0; j < dice[i].length; j++) {
      if (diceAdjustIndex === selectedDice) {
        if (changeNumber === dice[i][j]) {
          console.log(`The dice is already set to ${changeNumber}. You must change the dice.`);
          return;
        }

        console.log(`Player ${playerTurn} has changed player ${i + 1}'s ${dice[i][j]} dice to ${changeNumber}.`);
        dice[i][j] = changeNumber;
        document.removeEventListener("keyup", ChangeDiceEvent);
        PassTurn();
        ContinueGame();
        return;
      }
      diceAdjustIndex++;
    }
  }
}