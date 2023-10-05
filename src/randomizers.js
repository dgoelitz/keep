import useStateValue from './StateContext';

export function RollAllDice(extraDicePlayer) {
  const { 
    players,
    setDice,
    lost
  } = useStateValue();

  let diceTemp = [];
  for (let i = 0; i < players; i++) {
    if (lost[i]) continue;
    let playerDice = [];
    playerDice.push(rollDie());
    playerDice.push(rollDie());
    if (i === extraDicePlayer - 1) playerDice.push(rollDie());
    diceTemp.push(playerDice);
  }

  setDice(diceTemp);
  console.log("erbody's dice yo:", diceTemp);
}

function rollDie() {
  return Math.floor((Math.random() * 6) + 1);
};

export function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}