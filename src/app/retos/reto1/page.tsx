'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/RetoCard.module.css';

export default function Reto1() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('reto1Completed', 'false');
  }, []);

  const checkReto1 = () => {
    const correcta = "47"; // A=1, M=13, O=15, R=18 => 1+13+15+18 = 47
    if (respuesta.trim() === correcta) {
      setFeedback('✨ ¡Correcto! Has resuelto el acertijo. Continuemos con el siguiente reto...');
      localStorage.setItem('reto1Completed', 'true');
      setTimeout(() => router.push('/retos/reto2'), 1500);
    } else {
      setFeedback('❌ Incorrecto, intenta de nuevo. ¡Tú puedes!');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🌟 Reto 1: Acertijo Lógico</h2>
      
      <p className={styles.description}>
        Si <strong>A = 1</strong>, <strong>B = 2</strong>... ¿cuál es el número correspondiente a la palabra <strong>AMOR</strong>?
      </p>
      
      {/* Imagen decorativa */}
      <div className={styles.imageContainer}>
        <img
          src="/images/reto1.webp" // Imagen decorativa (colócala en public/images)
          alt="Corazón de acertijo"
          width={300}
          height={200}
          className={styles.image}
        />
      </div>

      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta aquí"
        className={styles.input}
      />

      <button onClick={checkReto1} className={styles.btn}>
        Comprobar
      </button>

      <p className={styles.feedback}>{feedback}</p>

      {/* Botón para mostrar pista */}
      <button onClick={() => setShowHint(!showHint)} className={styles.hintBtn}>
        {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
      </button>

      {showHint && (
        <p className={styles.hint}>
          💡 Pista: ¡ Todo Suma al final!
        </p>
      )}
    </div>
  );
}
