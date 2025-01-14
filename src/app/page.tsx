"use client";

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    router.push('/retos/reto1');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido a la Búsqueda del Tesoro!</h1>
      <p className={styles.description}>Prepárate para resolver acertijos y retos. ¡Al final te espera algo especial!</p>
      <button className={styles.btn} onClick={startGame}>Empezar</button>
    </div>
  );
}
