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
      setFeedback('¡Correcto! Has completado el reto de programación.');
      localStorage.setItem('reto3Completed', 'true');
    //   setTimeout(() => router.push('/final'), 1000);
    } else {
      setFeedback('La respuesta no es correcta, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.card}>
      <h2>Reto 3: Desafío de Programación</h2>
      <p>Observa el siguiente código de Python y escribe cuál sería la salida al ejecutarlo si ingresas el nombre "Cristhian":</p>
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
      />
      <button onClick={checkAnswer}>Comprobar</button>
      <p>{feedback}</p>
    </div>
  );
}
