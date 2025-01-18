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
  };

  return (
    <div className={styles.card}>
      {!showCard ? (
        <div>
          <h2 className={styles.title}>Verifica la Clave</h2>
          <p className={styles.message}>
            Para desbloquear esta carta especial, ingresa la clave que descubriste en el reto 7:
          </p>
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
            Después de todo este recorrido y superar juntos cada reto, quiero decirte algo importante. Desde el primer día que te conocí, 
            supe que eras especial. Juntos hemos compartido risas, sueños y momentos únicos, y aunque sé que no todo es perfecto, quiero que 
            sepas que siempre estoy dispuesta a enfrentar todo contigo.
            <br />
            Quiero que esta carta sea el comienzo de un nuevo capítulo. Un capítulo lleno de aventuras, amor y complicidad. No importa lo que venga, 
            siempre quiero que sepas que estaré aquí para ti, como sé que tú estarás para mí.
            <br />
            Así que, ahora que hemos llegado al final de este camino, solo tengo una pregunta para ti:
            <br />
            <strong>¿Quieres tener el privilegio de ser mi novio? ❤️</strong>
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
