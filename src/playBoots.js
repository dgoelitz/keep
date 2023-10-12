import { useStateValue } from "./StateContext";
import { ContinueGame } from "./gameFlow";
import { PassTurn, OnlyOneCardToPlay, DisplayPlayableCards, TakeCardToPlayInput, TakeNoAction } from "./gameMechanics";
import { SetBoardPosition } from "./movement";
import { Discard } from "./discardCard";

export function PlayBootsCard() {
  const {
    playerTurn,
    usingBoots,
    hands
  } = useStateValue();

  if (hands[playerTurn - 1].length <= 1) {
    OnlyOneCardToPlay();
    return;
  }

  let hasCard = DisplayPlayableCards("b");

  if (!hasCard) {
    if (usingBoots) {
      console.log("You do not have a boots card to play.");
      PassTurn();
      ContinueGame();
      return;
    }
    console.log("You do not have a boots card to play and must discard instead.");
    Discard(playerTurn);
    PassTurn();
    return;
  }

  if (usingBoots)
    console.log("You may press p to pass and take no action.");

  document.addEventListener("keyup", BootsEvent);
}

function BootsEvent(event) {
  const {
    playerTurn,
    usingBoots,
    setUsingBoots,
    hands,
    setHands
  } = useStateValue();

  if (event.key === "p" && usingBoots === true) {
    document.removeEventListener("keyup", BootsEvent);
    TakeNoAction();
    return;
  }
  let chosenCard = TakeCardToPlayInput(event, playerTurn);
  if (chosenCard === undefined) return;

  let card = hands[playerTurn - 1][chosenCard - 1];
  if (card[0] !== "b") {
    console.log("You must play a boots card.");
    return;
  }

  setHands(prevHands => {
    const updatedHands = [...prevHands];
    updatedHands[playerTurn - 1].splice(chosenCard - 1, 1);
    return updatedHands;
  });

  setUsingBoots(true);
  document.removeEventListener("keyup", BootsEvent);
  SetBoardPosition(parseInt(card.slice(1)));
}