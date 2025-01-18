'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/RetoCard.module.css';

export default function Reto7() {
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showContinue, setShowContinue] = useState(false); // Controlar la visibilidad del botón "Continuar"
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('reto6Completed') !== 'true') {
      router.push('/');
    }
  }, [router]);

  const encryptedMessage = 'U29tZXdoZXJlIG92ZXIgdGhlIHJhaW5ib3cu'; // "Somewhere over the rainbow."
  const correctKey = '04-07-2016'; // Fecha importante
  const correctAnswer = 'Somewhere over the rainbow.';

  const handleDecrypt = () => {
    if (answerInput === correctKey) {
      setFeedback(
        `✨ ¡Correcto! El mensaje es: "${correctAnswer}". 
        Esta fue nuestra fecha de aniversario, un día donde todo comenzó. 
        Hoy es un nuevo inicio, pero siempre recordaré cómo empezó nuestra historia. ❤️`
      );
      localStorage.setItem('reto7Completed', 'true'); // Guardar el avance
      setShowContinue(true); // Mostrar el botón "Continuar"
    } else {
      setFeedback('❌ Clave incorrecta. Intenta de nuevo.');
    }
  };

  const handleContinue = () => {
    router.push('/retos/final'); // Redirigir al reto final
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🔐 Reto 7: Criptografía del Corazón</h2>
      <p className={styles.description}>
        Aquí tienes un mensaje encriptado que guarda algo especial. 
        Desencripta el mensaje usando una clave que representa un día muy importante para nosotros:
      </p>
      <pre className={styles.codeBlock}>{encryptedMessage}</pre>
      <p className={styles.hint}>💡 Pista: Es la fecha en la que comenzó nuestra historia: dd-mm-aaaa.</p>
      <input
        type="text"
        value={answerInput}
        onChange={(e) => setAnswerInput(e.target.value)}
        placeholder="Ingresa la clave aquí"
        className={styles.input}
      />
      <button onClick={handleDecrypt} className={styles.btn}>
        Desencriptar
      </button>
      <p className={styles.feedback}>{feedback}</p>
      {showContinue && (
        <button onClick={handleContinue} className={styles.continueBtn}>
          Continuar
        </button>
      )}
    </div>
  );
}
