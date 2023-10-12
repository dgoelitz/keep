import { useStateValue } from './StateContext';
import { ContinueGame, DrawOrDiscardLoop } from './gameFlow';
import { PassTurn, LoseTheGame, DisplayPlayableCards, TakeCardToPlayInput, TakeNoAction } from './gameMechanics';
import { Discard } from './discardCard';

export function PlaySwordCard() {
  const {
    playerTurn,
    usingBoots
  } = useStateValue();

  let hasCard = DisplayPlayableCards("w");

  if (!hasCard) {
    if (usingBoots) {
      console.log("You do not have a sword card to play.");
      PassTurn();
      ContinueGame();
      return;
    }
    console.log("You do not have a sword card to play and must discard instead.");
    Discard(playerTurn);
    PassTurn();
    return;
  }

  if (usingBoots)
    console.log("You may press p to pass and take no action.");

  document.addEventListener("keyup", SwordEvent);
}

function SwordEvent(event) {
  const {
    playerTurn,
    usingBoots,
    setAttackDamage,
    setPlayerTakingDamage,
    setDamageBeingDealt,
    hands,
    setHands
  } = useStateValue();

  if (event.key === "p" && usingBoots === true) {
    document.removeEventListener("keyup", SwordEvent);
    TakeNoAction();
    return;
  }
  let chosenCard = TakeCardToPlayInput(event, playerTurn);
  if (chosenCard === undefined) return;

  let card = hands[playerTurn - 1][chosenCard - 1];
  if (card[0] !== "w") {
    console.log("You must play a sword card.");
    return;
  }

  setHands(prevHands => {
    const updatedHands = [...prevHands];
    updatedHands[playerTurn - 1].splice(chosenCard - 1, 1);
    return updatedHands;
  });

  document.removeEventListener("keyup", SwordEvent);

  setAttackDamage(parseInt(card[1]));
  setPlayerTakingDamage(0);
  setDamageBeingDealt(true);

  if (hands[playerTurn - 1].length < 1) CheckForDraw();
  else SwordDamage();
}

function CheckForDraw() {
  const {
    setGameOver,
    playerTurn,
    players,
    attackDamage,
    hands
  } = useStateValue();

  let drawGame = true;
  for (let i = 0; i < players; i++)
    if (hands[i].length > attackDamage)
      drawGame = false;

  if (drawGame) {
    console.log("The game is a draw.");
    setGameOver(true);
    return;
  }

  LoseTheGame(playerTurn);
  SwordDamage();
}

export function SwordDamage() {
  const {
    players,
    playerTurn,
    setDrawOrDiscardCounter,
    setPlayerDiscarding,
    attackDamage,
    playerTakingDamage,
    setPlayerTakingDamage,
    setDamageBeingDealt,
    lost
  } = useStateValue();

  setPlayerTakingDamage(playerTakingDamage + 1);
  if (playerTakingDamage === playerTurn || lost[playerTakingDamage - 1]) 
    setPlayerTakingDamage(playerTakingDamage + 1);
  if (playerTakingDamage > players) {
    setDamageBeingDealt(false);
    PassTurn();
    ContinueGame();
    return;
  }

  console.log(`Player ${playerTakingDamage} is taking damage.`);
  setPlayerDiscarding(playerTakingDamage);
  setDrawOrDiscardCounter(attackDamage * -1);
  DrawOrDiscardLoop();
}