'use client';

import { useState, useEffect } from 'react';
import styles from '../../../styles/RetoCard.module.css';
import { useRouter } from 'next/navigation';

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
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();
  const maxAttempts = 10;

  useEffect(() => {
    if (localStorage.getItem('reto1Completed') !== 'true') {
      router.push('/');
    }

    const initialValues = ['😘', '💋', '😍', '🎁', '😻', '🍒', '💘', '🌻'];
    // const initialValues = ['😘', '💋'];
    const shuffledCards = [...initialValues, ...initialValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, flipped: false, matched: false }));
    setCards(shuffledCards);
  }, [router]); // Se incluye 'router' en las dependencias

  useEffect(() => {
    localStorage.setItem('reto2Completed', 'false');
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
    let newAttempts = attempts 

    if (newCards[firstIndex].value === newCards[secondIndex].value) {
      newCards[firstIndex].matched = true;
      newCards[secondIndex].matched = true;
      setFeedback('¡Es un match! ✨');
    } else {
        newAttempts = newAttempts+ 1;
    setAttempts(newAttempts);
      newCards[firstIndex].flipped = false;
      newCards[secondIndex].flipped = false;
      setFeedback('No coinciden, intenta de nuevo. ❌');
    }

    setCards(newCards);
    setFlippedCards([]);

    if (newCards.every((card) => card.matched)) {
      localStorage.setItem('reto2Completed', 'true');
      setFeedback('¡Felicidades, completaste el reto de memoria! 💖');
      setTimeout(() => router.push('/retos/reto3'), 1500);
    } else if (newAttempts >= maxAttempts) {
      setFeedback('Has alcanzado el número máximo de intentos. Volviendo a empezar...');
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>💖 Reto 2: Juego de Memoria</h2>
      <p className={styles.description}>
        Encuentra todas las parejas de cartas iguales. A veces, unir las piezas correctas es como encontrar
        a la persona que complementa tu vida. 💑
      </p>
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
      <p className={styles.feedback}>{feedback}</p>
      <p className={styles.attempts}>Intentos: {attempts} / {maxAttempts}</p>
    </div>
  );
}
