'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../../../styles/RetoCard.module.css';

interface Tile {
  id: number;
  src: string;
  correctPosition: boolean;
}

export default function Reto5() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('reto4Completed') !== 'true') {
      router.push('/');
    }
    initializePuzzle();
  }, [router]);

  const initializePuzzle = () => {
    const imagePieces = [
      '/images/puzzle/fila-1-columna-1.jpg',
      '/images/puzzle/fila-1-columna-2.jpg',
      '/images/puzzle/fila-1-columna-3.jpg',
      '/images/puzzle/fila-2-columna-1.jpg',
      '/images/puzzle/fila-2-columna-2.jpg',
      '/images/puzzle/fila-2-columna-3.jpg',
      '/images/puzzle/fila-3-columna-1.jpg',
      '/images/puzzle/fila-3-columna-2.jpg',
      '/images/puzzle/fila-3-columna-3.jpg',
    ];
    const shuffledTiles = imagePieces
      .map((src, index) => ({ id: index, src, correctPosition: false }))
      .sort(() => Math.random() - 0.5);
    setTiles(shuffledTiles);
  };

  const handleTileClick = (index: number) => {
    const newTiles = [...tiles];
    if (index > 0 && !newTiles[index - 1].correctPosition) {
      [newTiles[index - 1], newTiles[index]] = [newTiles[index], newTiles[index - 1]];
    } else if (index < newTiles.length - 1 && !newTiles[index + 1].correctPosition) {
      [newTiles[index + 1], newTiles[index]] = [newTiles[index], newTiles[index + 1]];
    }
    setTiles(newTiles);
    checkPuzzleCompletion(newTiles);
  };

  const checkPuzzleCompletion = (tiles: Tile[]) => {
    const isCompleted = tiles.every((tile, index) => tile.id === index);
    if (isCompleted) {
      setFeedback('¡Correcto! Has completado el puzzle. 💖');
      localStorage.setItem('reto5Completed', 'true');
      setTimeout(() => router.push('/retos/reto6'), 1500);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🧩 Reto 5: Puzzle Interactivo</h2>
      <p className={styles.description}>
        Esta imagen representa uno de nuestros momentos más especiales, porque juntos logramos construir algo único. 
        Así como cada pieza tiene su lugar, tú eres esa pieza que hace que mi vida esté completa. ❤️
      </p>
      <div className={styles.gridImage}>
        {tiles.map((tile, index) => (
          <div
            key={tile.id}
            className={styles.tileImage}
            onClick={() => handleTileClick(index)}
          >
            <Image src={tile.src} alt={`Puzzle piece ${index + 1}`} width={80} height={80} />
          </div>
        ))}
      </div>
      <p>{feedback}</p>
    </div>
  );
}
