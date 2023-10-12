import { useStateValue } from './StateContext';
import { BOARD } from './constants';
import { DrawOrDiscardLoop } from './gameFlow';
import { LandOnSpace } from './movement';

export function ResetHandSize(moveNumber) {
  const {
    playerTurn,
    drawOrDiscardCounter,
    setDrawOrDiscardCounter,
    setPlayerDiscarding,
    resettingHand,
    setResettingHand,
    handSize,
    hands,
    spaces,
    setTokens
  } = useStateValue();

  console.log(`Player ${playerTurn} moved ${moveNumber} space(s) and landed on a ${BOARD[spaces[playerTurn - 1]]} space.`);
  console.log(`Player ${playerTurn} also passed start.`);

  setDrawOrDiscardCounter(handSize - hands[playerTurn - 1].length);
  if (drawOrDiscardCounter !== 0) {
    console.log(`Player ${playerTurn} must reset their hand size to ${handSize}.`);
    setResettingHand(true);
    setPlayerDiscarding(playerTurn);
    DrawOrDiscardLoop();
  }

  setTokens(prevTokens => {
    const updatedTokens = [...prevTokens];
    updatedTokens[playerTurn - 1] = false;
    return updatedTokens;
  });
  CheckAndResetTokens();

  if (resettingHand === false) LandOnSpace();
}

export function CheckAndResetTokens() {
  const {
    handSize,
    setHandSize,
    tokens,
    lost
  } = useStateValue();

  if (tokens.indexOf(true) === -1) {
    setHandSize(handSize - 1);
    for (let i = 0; i < tokens.length; i++)
      if (!lost[i])
        tokens[i] = true;

    console.log(`All players have passed start. The default hand size is now ${handSize}.`);
  }
}