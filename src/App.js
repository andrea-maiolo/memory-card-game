import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { nanoid } from "nanoid";

function App() {
  const [cards, setCards] = useState(allNewCards());
  const [gameOver, setGameOver] = useState(false);

  function generateNewCard() {
    return {
      value: `${Math.floor(Math.random() * (50 - 1 + 1) + 1)}.png`,
      isHold: false,
      id: nanoid(),
    };
  }

  function allNewCards() {
    const newCard = [];
    for (let i = 0; i < 4; i++) {
      newCard.push(generateNewCard());
    }
    return newCard;
  }

  const isGameOver = function () {
    setGameOver((prevState) => !prevState);
  };

  //check if player clicked all cards
  //if so increase difficulty
  const levelUp = function () {
    let b = cards.every((c) => c.isHold === true);
    if (b == true) {
      console.log("time to level up");
    }
  };

  const handleCardClick = function (id) {
    const currentCard = cards.find((c) => c.id === id);
    if (currentCard.isHold === true) {
      isGameOver();
    } else {
      currentCard.isHold = !currentCard.isHold;
      const updatedCards = [...cards];
      const index = cards.findIndex((c) => c.id === id);
      updatedCards[index] = currentCard;
      setCards(updatedCards);
      levelUp();
    }
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
      {!gameOver && <div className="cardContainer">{cardsElements}</div>}
      {gameOver && <p>Game over</p>}
    </main>
  );
}
export default App;
