'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/RetoCard.module.css';

export default function Reto3() {
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('reto2Completed') !== 'true') {
      router.push('/');
    }
  }, [router]);

  const checkAnswer = () => {
    const correctAnswer = 'Hola Cristhian, Te Quiero Te Quiero  <3';
    if (answerInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback('¡Correcto! 🎉 Has completado el reto de programación.');
      localStorage.setItem('reto3Completed', 'true');
      setTimeout(() => router.push('/retos/reto4'), 1500);
    } else {
      setFeedback('❌ La respuesta no es correcta, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>💻 Reto 3: Desafío de Programación</h2>
      <p className={styles.description}>
        Este reto es especial. Quiero que, por un momento, entres en mi mundo, en aquello que amo hacer: programar.
        Porque así como en el código buscamos siempre la solución perfecta, en la vida también busco a alguien que
        complemente mi mundo. ❤️
      </p>

      <p className={styles.instructions}>
        Observa el siguiente código de Python y escribe cuál sería la salida al ejecutarlo si ingresas el nombre <strong>"Cristhian"</strong>:
      </p>
      
      <pre className={styles.codeBlock}>
        {`def mensaje(nombre):
    saludo = "Hola " + nombre
    def anidado(repeticiones):
        constante = "Te Quiero"
        resultado = []
        for i in range(repeticiones):
            resultado.append(constante)
        return saludo + ", " + " ".join(resultado)
    return anidado(2)

nombre_usuario = input("Ingresa tu nombre: ")
print(mensaje(nombre_usuario), ' <3')`}
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
    </div>
  );
}
