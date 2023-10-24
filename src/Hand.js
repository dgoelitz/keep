import React, { useState, useEffect, useMemo } from 'react';

function Hand(props) {
  const cardNames = useMemo(() => [
    'w', 'w1', 'w2', 'w3',
    'h', 'h1', 'h2', 'h3',
    'b', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b12'
  ], []);

  const [cards, setCards] = useState({});

  useEffect(() => {
    const importCards = async () => {
      const cardImports = cardNames.map(cardName => import(`./images/cards/${cardName}.png`));
      const cardModules = await Promise.all(cardImports);
      const cardMap = {};
      cardNames.forEach((cardName, index) => {
        cardMap[cardName] = cardModules[index].default;
      });
      setCards(cardMap);
    };

    importCards();
  }, [cardNames]);

  const hand = props.hand.map((cardName, index) => {
    const card = cards[cardName];
    return <img key={index} src={card} alt={`A ${card} card`} style={{ width: 100 / props.hand.length + "%" }} />;
  });

  return (
    <div className={props.handClass} style={{ transform: `rotate(${props.rotation}deg)` }}>
      {hand}
    </div>
  );
}

export default Hand;