import { useStateValue } from './StateContext';
import { ContinueGame } from './gameFlow';

export function DrawCard() {
  const {
    decks,
    playerTurn
  } = useStateValue();

  if (decks.sword.length === 0 && decks.shield.length === 0 && decks.boots.length === 0) {
    console.log(`All decks are empty. Player ${playerTurn} cannot draw.`);
    ContinueGame();
  }
  else {
    console.log(`Player ${playerTurn} is drawing. Press w, h, or b.`);
    document.addEventListener("keyup", CardDrawEvent);
  }
}

function CardDrawEvent(event) {
  const {
    playerTurn,
    decks,
    setDecks,
    hands,
    setHands
  } = useStateValue();

  let cardDrawn = false;
  if (event.key === "w") {
    if (decks.sword.length === 0) {
      console.log("The sword deck is empty.");
      return;
    }

    setHands(prevHands => {
      const updatedHands = [...prevHands];
      const updatedSwordDeck = [...decks.sword];
      const drawnCard = updatedSwordDeck.pop();
      updatedHands[playerTurn - 1].push("w" + drawnCard);
      setDecks(prevDecks => ({ ...prevDecks, sword: updatedSwordDeck }));
      return updatedHands;
    });
    
    cardDrawn = true;
    console.log(`Player ${playerTurn} drew a sword card.`);
  }
  else if (event.key === "h") {
    if (decks.shield.length === 0) {
      console.log("The shield deck is empty.");
      return;
    }
    
    setHands(prevHands => {
      const updatedHands = [...prevHands];
      const updatedShieldDeck = [...decks.shield];
      const drawnCard = updatedShieldDeck.pop();
      updatedHands[playerTurn - 1].push("h" + drawnCard);
      setDecks(prevDecks => ({ ...prevDecks, shield: updatedShieldDeck }));
      return updatedHands;
    });

    cardDrawn = true;
    console.log(`Player ${playerTurn} drew a shield card.`);
  }
  else if (event.key === "b") {
    if (decks.boots.length === 0) {
      console.log("The boots deck is empty.");
      return;
    }
    
    setHands(prevHands => {
      const updatedHands = [...prevHands];
      const updatedBootsDeck = [...decks.boots];
      const drawnCard = updatedBootsDeck.pop();
      updatedHands[playerTurn - 1].push("b" + drawnCard);
      setDecks(prevDecks => ({ ...prevDecks, boots: updatedBootsDeck }));
      return updatedHands;
    });

    cardDrawn = true;
    console.log(`Player ${playerTurn} drew a boots card.`);
  }

  if (cardDrawn) {
    console.log(hands[playerTurn - 1]);
    document.removeEventListener("keyup", CardDrawEvent);
    ContinueGame();
  }
}