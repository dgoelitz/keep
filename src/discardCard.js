import { useStateValue } from './StateContext';
import { CARD_INPUT_KEY } from './constants';
import { ContinueGame } from './gameFlow';
import { PassTurn, LoseTheGame, TakeCardToPlayInput } from './gameMechanics';

export function Discard(player) {
  const {
    playerTurn,
    setPlayerDiscarding,
    hands
  } = useStateValue();

  if (hands[player - 1].length <= 1) {
    LoseTheGame(player);
    if (playerTurn === player)
      PassTurn();
    ContinueGame();
    return;
  }

  console.log(`Player ${player} is discarding.`);
  console.log(`The player's hand: ${hands[player - 1]}.`);
  for (let i = 1; i <= hands[player - 1].length; i++) {
    let keyToPress = i;

    if (keyToPress > 9)
      for (const key in CARD_INPUT_KEY)
        if (CARD_INPUT_KEY[key] === keyToPress) {
          keyToPress = key;
          break;
        }

    console.log(`Press ${keyToPress} to discard your ${hands[player - 1][i - 1]} card.`);
  }
  setPlayerDiscarding(player);
  document.addEventListener("keyup", DiscardEvent);
}

function DiscardEvent(event) {
  const {
    playerDiscarding,
    hands,
    setHands
  } = useStateValue();

  let discardNumber = TakeCardToPlayInput(event, playerDiscarding);
  if (discardNumber === undefined) return;

  console.log(`Player ${playerDiscarding} has discarded a ${hands[playerDiscarding - 1][discardNumber - 1]} card.`);

  setHands(prevHands => {
    const updatedHands = [...prevHands];
    updatedHands[playerDiscarding - 1].splice(discardNumber - 1, 1);
    return updatedHands;
  });
  
  document.removeEventListener("keyup", DiscardEvent);
  ContinueGame();
}