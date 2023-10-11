import { useStateValue } from './StateContext';
import { CARD_INPUT_KEY } from './constants';
import { ContinueGame } from './gameFlow';

function PassTurn() {
  const { 
    gameOver,
    players,
    playerTurn,
    setPlayerTurn,
    lost,
    dice
  } = useStateValue();

  if (gameOver) return;

  setPlayerTurn(playerTurn + 1);
  if (playerTurn > players) setPlayerTurn(1);

  if (lost[playerTurn - 1]) {
    let next = playerTurn + 1;
    if (next > players) next = 1;
    dice[next - 1].push(dice[playerTurn - 1].pop());

    console.log(`Player ${playerTurn} has already lost the game.`);
    PassTurn();
  }
}

function LoseTheGame(player) {
  const { 
    setGameOver,
    setDrawOrDiscardCounter,
    lost,
    tokens
  } = useStateValue();

  console.log(`Player ${player} has lost the game.`);
  lost[player - 1] = true;
  tokens[player - 1] = false;
  checkAndResetTokens();
  setDrawOrDiscardCounter(0);

  let playersRemaining = [];
  for (let i = 0; i < lost.length; i++) if (lost[i] === false) playersRemaining.push(i + 1);
  if (playersRemaining.length === 1) {
    console.log(`Player ${playersRemaining[0]} wins the game.`);
    setGameOver(true);
  }
}

export function OnlyOneCardToPlay() {
  const {
    playerTurn,
    usingBoots
  } = useStateValue();

  if (usingBoots) console.log("You may not play a card because it would cause you to lose the game.");
  else LoseTheGame(playerTurn);
  PassTurn();
  ContinueGame();
}

export function DisplayPlayableCards(cardType) {
  const {
    hands,
    playerTurn
  } = useStateValue();

  let hasCard = false;
  let hand = hands[playerTurn - 1];
  for (let i = 1; i <= hand.length; i++) {
    let keyToPress = i;
    if (keyToPress > 9)
      for (const key in CARD_INPUT_KEY)
        if (CARD_INPUT_KEY[key] === keyToPress) {
          keyToPress = key;
          break;
        }

    if (hand[i - 1][0] === cardType) {
      hasCard = true;
      console.log(`Press ${keyToPress} to play your ${hand[i - 1]} card.`);
    }
  }

  return hasCard;
}

export function TakeCardToPlayInput(event, player) {
  const {
    hands
  } = useStateValue();

  let input = undefined;
  if (CARD_INPUT_KEY[event.key]) input = CARD_INPUT_KEY[event.key];
  else input = parseInt(event.key);
  if (input < 1 || input > 14 || Number.isNaN(input)) return;

  if (!hands[player - 1][input - 1]) {
    console.log(`You do not have ${input} cards.`);
    return;
  }

  return input;
}

export function TakeNoAction() {
  const {
    playerTurn
  } = useStateValue();

  console.log(`Player ${playerTurn} passes their turn.`);
  PassTurn();
  ContinueGame();
}