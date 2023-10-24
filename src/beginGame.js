import { useStateValue } from './StateContext';
import { ContinueGame } from './gameFlow';
import { shuffle } from './randomizers';

export function StartGame() {
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

  console.log("Select number of players by pressing 2, 3, or 4.")
  document.addEventListener("keyup", ChoosePlayersCountEvent);


  function ChoosePlayersCountEvent(event) {
    console.log("Is the beforrre after useStateValue?????");



    console.log("Is the error after useStateValue?????");

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


    let decksTemp = {};
    for (const deck in decks) {
      decksTemp[deck] = decks[deck].slice();
      shuffle(decksTemp[deck]);
    }

    setDecks(decksTemp);

    ContinueGame();
  }
}
