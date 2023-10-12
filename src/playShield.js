import { useStateValue } from "./StateContext";
import { ContinueGame, DrawOrDiscardLoop } from "./gameFlow";
import { PassTurn, DisplayPlayableCards, OnlyOneCardToPlay, TakeCardToPlayInput, TakeNoAction } from "./gameMechanics";
import { Discard } from "./discardCard";

export function PlayShieldCard() {
  const {
    playerTurn,
    usingBoots,
    hands
  } = useStateValue();

  if (hands[playerTurn - 1].length <= 1) {
    OnlyOneCardToPlay();
    return;
  }

  let hasCard = DisplayPlayableCards("h");

  if (!hasCard) {
    if (usingBoots) {
      console.log("You do not have a shield card to play.");
      PassTurn();
      ContinueGame();
      return;
    }
    console.log("You do not have a shield card to play and must discard instead.");
    Discard(playerTurn);
    PassTurn();
    return;
  }

  if (usingBoots)
    console.log("You may press p to pass and take no action.");

  document.addEventListener("keyup", ShieldEvent);
}

function ShieldEvent(event) {
  const {
    playerTurn,
    usingBoots,
    setChangeTurnAfterLoop,
    setDrawOrDiscardCounter,
    hands,
    setHands
  } = useStateValue();

  if (event.key === "p" && usingBoots === true) {
    document.removeEventListener("keyup", ShieldEvent);
    TakeNoAction();
    return;
  }
  let chosenCard = TakeCardToPlayInput(event, playerTurn);
  if (chosenCard === undefined) return;

  let card = hands[playerTurn - 1][chosenCard - 1];
  if (card[0] !== "h") {
    console.log("You must play a shield card.");
    return;
  }

  setHands(prevHands => {
    const updatedHands = [...prevHands];
    updatedHands[playerTurn - 1].splice(chosenCard - 1, 1);
    return updatedHands;
  });

  document.removeEventListener("keyup", ShieldEvent);

  setChangeTurnAfterLoop(true);
  setDrawOrDiscardCounter(parseInt(card[1]));
  DrawOrDiscardLoop();
}