import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { nanoid } from "nanoid";

function App() {
  const [level, setLevel] = useState(5);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  console.log(highScore);

  //check if there is an high score
  useEffect(() => {
    let provisionalHS = JSON.parse(localStorage.getItem("highScore"));
    if (provisionalHS == null) {
      return;
    } else {
      setHighScore(provisionalHS);
    }
  }, [0]);

  const movingIntoStorage = function () {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      window.localStorage.setItem("highScore", JSON.stringify(currentScore));
    }
  };

  //generate new cards
  useEffect(() => {
    function generateNewCard() {
      return {
        value: `${Math.floor(Math.random() * (50 - 1 + 1) + 1)}.png`,
        isHold: false,
        id: nanoid(),
      };
    }
    function getNewCards() {
      const newCards = [];
      for (let i = 0; i < level; i++) {
        newCards.push(generateNewCard());
      }
      const unique = [...new Set(newCards.map((item) => item.value))];
      if (unique.length < newCards.length) {
        getNewCards();
      } else {
        setCards(newCards);
      }
    }
    getNewCards();
  }, [level]);

  const isGameOver = function () {
    movingIntoStorage();
    setGameOver((prevState) => !prevState);
  };

  //check for lv up
  useEffect(() => {
    let isLevelUp = false;
    if (cards.length < 1) {
      return;
    }
    isLevelUp = cards.every((c) => c.isHold === true);
    if (isLevelUp) {
      setLevel((prevState) => prevState + 5);
    }
  }, [currentScore]);

  //shuffle cards
  useEffect(() => {
    if (cards.length < 1) {
      return;
    }
    let currentIndex = cards.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }
  }, [cards]);

  const handleCardClick = function (id) {
    const newArrayOfCards = [...cards];
    const currentCard = newArrayOfCards.find((c) => c.id === id);
    const index = newArrayOfCards.findIndex((c) => c.id === currentCard);
    if (currentCard.isHold === false) {
      currentCard.isHold = !currentCard.isHold;
      newArrayOfCards[index] = currentCard;
      setCards(newArrayOfCards);
      setCurrentScore((prevState) => prevState + 1);
    } else if (currentCard.isHold === true) {
      isGameOver();
    }
  };

  const handleGameOverClick = function () {
    window.location.reload();
  };

  const cardsElements = cards.map((c) => {
    return (
      <Card
        key={c.id}
        id={c.id}
        onClick={() => handleCardClick(c.id)}
        isHold={c.isHold}
        value={c.value}
      />
    );
  });

  return (
    <main>
      {!gameOver && (
        <div className="startingPage">
          <div className="scores">
            <p id="cs-para">Current score</p>
            <h2 id="cs-number">{currentScore}</h2>
            <p id="hs-para">High score</p>
            <h2 id="hs-number">{highScore}</h2>
          </div>
          <div className="cardContainer">{cardsElements}</div>
        </div>
      )}
      {gameOver && (
        <div className="finalPage">
          <h2>Game over</h2>
          <h3>High score</h3>
          <h2>{highScore}</h2>
          <button id="playAgain" onClick={handleGameOverClick}>
            Play again
          </button>
        </div>
      )}
    </main>
  );
}
export default App;
