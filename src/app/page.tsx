"use client";

import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import styles from './page.module.css';
// import bienvenida from '/public/images/bienvenida.jpeg';

export default function Home() {
  const router = useRouter();

  const startGame = () => {
    router.push('/retos/reto1');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡Bienvenido a nuestra Búsqueda del Tesoro!</h1>

      {/* Foto de bienvenida */}
      <div className={styles.photoContainer}>
        <img
          src="/images/bienvenida.jpeg" // Ruta de la imagen de bienvenida
          alt="Foto de nosotros"
          width={100}
          height={100}
          className={styles.photo}
        />
      </div>

      <p className={styles.description}>
        Esta no es una búsqueda del tesoro cualquiera… Es una aventura diseñada especialmente para ti. 
        Prepárate para resolver acertijos, superar retos y descubrir al final una sorpresa que cambiará nuestras vidas.
      </p>

      {/* Galería de recuerdos */}
      <div className={styles.gallery}>
        <img
          src="/images/recuerdo1.jpg" // Ruta de la primera foto de recuerdo
          alt="Recuerdo 1"
          width={150}
          height={150}
          className={styles.galleryPhoto}
        />
        <img
          src="/images/recuerdo2.jpeg" // Ruta de la segunda foto de recuerdo
          alt="Recuerdo 2"
          width={150}
          height={150}
          className={styles.galleryPhoto}
        />
        <img
          src="/images/recuerdo3.jpeg" // Ruta de la tercera foto de recuerdo
          alt="Recuerdo 3"
          width={150}
          height={150}
          className={styles.galleryPhoto}
        />
      </div>

      <button className={styles.btn} onClick={startGame}>Comenzar la aventura</button>
    </div>
  );
}
