'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/RetoCard.module.css';

export default function Reto4() {
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('reto3Completed') !== 'true') {
      router.push('/');
    }
  }, [router]);

  const checkAnswer = () => {
    const correctAnswer = 'Sorry por la mision, pero eres my aventura favorita.';
    if (answerInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback('¡Correcto! 🎉 Has completado el reto de decodificación.');
      localStorage.setItem('reto4Completed', 'true');
      setTimeout(() => router.push('/retos/reto5'), 1500);
    } else {
      setFeedback('❌ La respuesta no es correcta, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🔐 Reto 4: Decodificación de un Mensaje</h2>
      <p className={styles.description}>
        Decodifica el siguiente mensaje y escribe el resultado. A veces, los mensajes más importantes están ocultos y necesitan un poco de esfuerzo para ser descubiertos. 😉
      </p>
      
      <pre className={styles.codeBlock}>
        U29ycnkgcG9yIGxhIG1pc2lvbiwgcGVybyBlcmVzIG15IGF2ZW50dXJhIGZhdm9yaXRhLg==
      </pre>

      <input
        type="text"
        value={answerInput}
        onChange={(e) => setAnswerInput(e.target.value)}
        placeholder="Escribe la salida aquí"
        className={styles.input}
      />

      <button onClick={checkAnswer} className={styles.btn}>
        Comprobar
      </button>

      <p className={styles.feedback}>{feedback}</p>

      {/* Frase bonita */}
      <p className={styles.message}>
        Así como este mensaje esta oculto y necesitas decodificarlo, a veces las palabras más importantes no se dicen directamente, sino que se descubren con cariño y dedicación. Quiero que sepas que, aunque pueda ser difícil de descifrar a veces, lo que siento por ti es claro: te quiero muchisimo, eres mi aventura favorita. ❤️
      </p>

      {/* Botón para mostrar pista */}
      <button onClick={() => setShowHint(!showHint)} className={styles.hintBtn}>
        {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
      </button>

      {showHint && (
        <p className={styles.hint}>
          💡 Pista: Puedes usar alguna herramienta online para decodificar. Usa 64 😉
        </p>
      )}
    </div>
  );
}
