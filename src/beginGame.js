import { useStateValue } from './StateContext';
import { ContinueGame } from './gameFlow';
import { shuffle } from './randomizers';

export function startGame() {
  console.log("Select number of players by pressing 2, 3, or 4.")
  document.addEventListener("keyup", ChoosePlayersCountEvent);
}

function ChoosePlayersCountEvent(event) {
  const { 
    players,
    setPlayers, 
    setHands, 
    setTokens, 
    setSpaces, 
    setLost, 
    decks,
    setDecks
  } = useStateValue();

  const selection = parseInt(event.key);
  if (selection < 2 || selection > 4 || Number.isNaN(selection)) return;

  setPlayers(selection);

  console.log(`Starting game with ${players} players.`);
  document.removeEventListener("keyup", ChoosePlayersCountEvent);


  const hands = [];
  const tokens = [];
  const spaces = [];
  const lost = [];

  for (let i = 0; i < players; i++) {
    hands.push([]);
    tokens.push(true);
    spaces.push(0);
    lost.push(false);
  }

  setHands(hands);
  setTokens(tokens);
  setSpaces(spaces);
  setLost(lost);


  let decksTemp = decks.slice();
  for (const deck in decksTemp) {
    shuffle(decks[deck]);
  }
  console.log("Did shuffling work?", decksTemp);

  setDecks(decksTemp);

  ContinueGame();
}
