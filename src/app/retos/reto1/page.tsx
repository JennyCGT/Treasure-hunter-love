'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/RetoCard.module.css';

export default function Reto1() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem('reto1Completed', 'false');
  }, []);

  const checkReto1 = () => {
    const correcta = "47"; // A=1, M=13, O=15, R=18 => 1+13+15+18 = 47
    if (respuesta.trim() === correcta) {
      setFeedback('¡Correcto! Has resuelto el acertijo.');
      localStorage.setItem('reto1Completed', 'true');
      setTimeout(() => router.push('/retos/reto2'), 1000);
    } else {
      setFeedback('Incorrecto, intenta de nuevo.');
    }
  };

  return (
    <div className={styles.card}>
      <h2>Reto 1: Acertijo Lógico</h2>
      <p>Si A = 1, B = 2... ¿cuál es el número correspondiente a AMOR?</p>
      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta aquí"
      />
      <button onClick={checkReto1}>Comprobar</button>
      <p>{feedback}</p>
    </div>
  );
}
