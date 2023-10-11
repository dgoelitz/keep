import { useStateValue } from './StateContext';
import { BOARD } from './constants';
import { PassTurn } from './gameMechanics';
import { RollAllDice } from './randomizers';
import { LandOnSpace, MoveSpaceEvent } from './movement';
import { DrawCard } from './drawCard';

export function ContinueGame() {
  const {
    gameOver,
    gameInDrawOrDiscardLoop,
    resettingHand,
    setResettingHand,
    damageBeingDealt,
    changeTurnAfterLoop,
    setChangeTurnAfterLoop,
    initialDraw
  } = useStateValue();

  if (gameOver) return;
  if (gameInDrawOrDiscardLoop) {
    drawOrDiscardLoop();
    return;
  }
  if (resettingHand) {
    setResettingHand(false);
    LandOnSpace();
    return;
  }
  if (damageBeingDealt) {
    swordDamage();
    return;
  }
  if (changeTurnAfterLoop) {
    setChangeTurnAfterLoop(false);
    PassTurn();
  }

  if (initialDraw) {
    InitialDrawStage();
  }
  if (!initialDraw) {
    PlayGameStage();
  }
}

function InitialDrawStage() {
  const {
    hands,
    handSize,
    players,
    playerTurn,
    setPlayerTurn,
    setInitialDraw
  } = useStateValue();

  while (true) {
    if (hands[playerTurn - 1].length < handSize) {
      DrawCard();
      break;
    }
    if (playerTurn === players) {
      setInitialDraw(false);
      setPlayerTurn(1);
      console.log("Initial draw is complete.");
      RollAllDice(1);
      break;
    }
    setPlayerTurn(playerTurn + 1);
  }
}

function PlayGameStage() {
  const {
    hands,
    dice,
    spaces,
    playerTurn,
    setUsingBoots
  } = useStateValue();

  setUsingBoots(false);

  dice[playerTurn - 1].sort();
  hands[playerTurn - 1].sort();
  console.log(`It is player ${playerTurn}'s turn. They can move ${dice[playerTurn - 1][0]}, ${dice[playerTurn - 1][1]}, or ${dice[playerTurn - 1][2]} spaces. Press the number of spaces to move.`);
  console.log(`
    The player's hand: ${hands[playerTurn - 1]}.
    The player's dice: ${dice[playerTurn - 1]}.
    The board: ${BOARD}.
    The player is on space ${spaces[playerTurn - 1]} (${BOARD[spaces[playerTurn - 1]]}).
    Start is considered space 0.
  `);
  document.addEventListener("keyup", MoveSpaceEvent);
}