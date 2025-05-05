// src/components/Moon.jsx
import styles from './Moon.module.css';

export default function Moon() {
  return (
    <div className={styles.moon}>
      <div className={styles.crater}></div>
      <div className={styles.crater}></div>
      <div className={styles.crater}></div>
    </div>
  );
}