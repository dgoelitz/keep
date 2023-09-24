import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [decks, setDecks] = useState({
    sword:
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
    shield:
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
    boots:
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5,
        5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 12]
  });

  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState(4);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [playerDiscarding, setPlayerDiscarding] = useState(0);
  const [playerTakingDamage, setPlayerTakingDamage] = useState(0);
  const [handSize, setHandSize] = useState(7);
  const [drawOrDiscardCounter, setDrawOrDiscardCounter] = useState(0);
  const [attackDamage, setAttackDamage] = useState(0);
  const [selectedDice, setSelectedDice] = useState(0);
  const [usingBoots, setUsingBoots] = useState(false);
  const [initialDraw, setInitialDraw] = useState(true);
  const [gameInDrawOrDiscardLoop, setGameInDrawOrDiscardLoop] = useState(false);
  const [changeTurnAfterLoop, setChangeTurnAfterLoop] = useState(false);
  const [resettingHand, setResettingHand] = useState(false);
  const [damageBeingDealt, setDamageBeingDealt] = useState(false);
  const [dice, setDice] = useState([]);
  const [hands, setHands] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [lost, setLost] = useState([]);

  return (
    <StateContext.Provider value={{
      decks, setDecks,
      gameOver, setGameOver,
      players, setPlayers,
      playerTurn, setPlayerTurn,
      playerDiscarding, setPlayerDiscarding,
      playerTakingDamage, setPlayerTakingDamage,
      handSize, setHandSize,
      drawOrDiscardCounter, setDrawOrDiscardCounter,
      attackDamage, setAttackDamage,
      selectedDice, setSelectedDice,
      usingBoots, setUsingBoots,
      initialDraw, setInitialDraw,
      gameInDrawOrDiscardLoop, setGameInDrawOrDiscardLoop,
      changeTurnAfterLoop, setChangeTurnAfterLoop,
      resettingHand, setResettingHand,
      damageBeingDealt, setDamageBeingDealt,
      dice, setDice,
      hands, setHands,
      tokens, setTokens,
      spaces, setSpaces,
      lost, setLost
     }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext);
}