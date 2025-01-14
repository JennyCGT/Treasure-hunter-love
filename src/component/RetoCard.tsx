import styles from '../styles/RetoCard.module.css';

export default function RetoCard({ title, description, children }) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
