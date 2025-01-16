'use client';

import { useState, useEffect } from 'react';
import styles from '../../../styles/Final.module.css';

export default function Final() {
  const [keyInput, setKeyInput] = useState('');
  const [showCard, setShowCard] = useState(false);
  const correctKey = 'Somewhere over the rainbow'; // Clave del reto 7

  useEffect(() => {
    if (localStorage.getItem('reto7Completed') !== 'true') {
      window.location.href = '/';
    }
  }, []);

  const handleVerifyKey = () => {
    if (keyInput === correctKey) {
      setShowCard(true);
    } else {
      alert('Clave incorrecta. Intenta de nuevo.');
    }
  };

  const handleAccept = () => {
    alert('¡Gracias por aceptar! 💖');
    const hearts = document.querySelectorAll(`.${styles.heart}`);
    hearts.forEach((heart, index) => {
      setTimeout(() => {
        heart.classList.add(styles.show);
      }, index * 200);
    });
  };

  return (
    <div className={styles.card}>
      {!showCard ? (
        <div>
          <h2 className={styles.title}>Verifica la Clave</h2>
          <p className={styles.message}>Ingresa la clave del reto 7 para desbloquear la carta:</p>
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Ingresa la clave aquí"
            className={styles.input}
          />
          <button className={styles.button} onClick={handleVerifyKey}>
            Verificar Clave
          </button>
        </div>
      ) : (
        <div>
          <h2 className={styles.title}>Mi Carta para Ti</h2>
          <p className={styles.message}>
            Querido Cristhian,
            <br />
            Espero que te haya gustado y divertido un poco, te quiero mucho eres la persona con la que quiero compartir los mejores y los 
            <br />
            peores momentos de mi vida quiero poder reir y llorar contigo mientras se que estaras para mi y yo para ti.
            <br />
            Entonces: 
            <br />
            Después de superar todos estos retos y demostrar tu ingenio, creatividad y perseverancia esta en especual, quiero hacerte una pregunta importante.
            <br />
            ¿Quieres ser el afortunado de ser mi novio? ❤️
          </p>
          <button className={styles.button} onClick={handleAccept}>
            Sí, quiero
          </button>
          <div className={styles.heartsContainer}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.heart}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}