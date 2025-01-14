'use client';

import { useState, useEffect } from 'react';
import styles from '../../../styles/RetoCard.module.css';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function Reto2() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const initialValues = ['🍎', '🍌', '🍇', '🍒'];
    const shuffledCards = [...initialValues, ...initialValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, flipped: false, matched: false }));
    setCards(shuffledCards);
  }, []);

  const handleFlip = (index: number) => {
    if (flippedCards.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newFlippedCards = [...flippedCards, index];
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 1000);
    }
  };

  const checkMatch = (flipped: number[]) => {
    const [firstIndex, secondIndex] = flipped;
    const newCards = [...cards];

    if (newCards[firstIndex].value === newCards[secondIndex].value) {
      newCards[firstIndex].matched = true;
      newCards[secondIndex].matched = true;
      setFeedback('¡Es un match!');
    } else {
      newCards[firstIndex].flipped = false;
      newCards[secondIndex].flipped = false;
      setFeedback('No coinciden, intenta de nuevo.');
    }

    setCards(newCards);
    setFlippedCards([]);

    if (newCards.every(card => card.matched)) {
      setFeedback('¡Felicidades, completaste el reto de memoria!');
    }
  };

  return (
    <div className={styles.card}>
      <h2>Reto 2: Juego de Memoria</h2>
      <p>Encuentra todas las parejas de cartas iguales.</p>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={
              card.flipped || card.matched ? styles.cardFlipped : styles.cardBack
            }
            onClick={() => handleFlip(index)}
          >
            {card.flipped || card.matched ? card.value : '?'}
          </div>
        ))}
      </div>
      <p>{feedback}</p>
    </div>
  );
}