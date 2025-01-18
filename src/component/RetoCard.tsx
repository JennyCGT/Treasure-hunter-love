import React, { ReactNode } from 'react';
import styles from '../../../styles/RetoCard.module.css';

// Define una interfaz para las propiedades
interface RetoCardProps {
  title: string;
  description: string;
  children: ReactNode; // Para soportar contenido dentro del componente
}

export default function RetoCard({ title, description, children }: RetoCardProps) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
