import Hand from './Hand';

function Game() {

  const hands = [
    ['h3','w2','b4','h1','h1','h1','h1'],
    ['b','b','h','w','w','h','h'],
    ['b','b','h','w','w','h','h'],
    ['b','b','h','w','w','h','h']]

  return (
    <div className="Game">
      <div className="container">
        <div className="box cool"></div>
        <div className="box slick">
          <Hand handClass="hand2" hand={hands[2]} rotation={180}></Hand>
        </div>
        <div className="box cool"></div>
      </div>
      <div className="container">
        <div className="box waycool">
          <Hand handClass="hand3" hand={hands[3]} rotation={90}></Hand>
        </div>
        <div className="box cool waycool slick"></div>
        <div className="box waycool">
          <Hand handClass="hand1" hand={hands[1]} rotation={270}></Hand>
        </div>
      </div>
      <div className="container">
        <div className="box cool"></div>
        <div className="box slick">
          <Hand handClass="hand0" hand={hands[0]} rotation={0}></Hand>
        </div>
        <div className="box cool"></div>
      </div>
    </div>
  );
}

export default Game;
