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

  console.log(cards);
  //rivisita questa funzione perche il gioco e diverso da quello dei dadi
  const handleCardClick = function (id) {
    setCards((prevCards) =>
      prevCards.map((card) => {
        return card.id === id ? { ...card, isHold: !card.isHold } : card;
      })
    );
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
      <div className="cardContainer">{cardsElements}</div>
    </main>
  );
}
export default App;
