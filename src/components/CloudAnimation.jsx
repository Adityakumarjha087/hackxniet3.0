// src/components/CloudAnimation.jsx
import styles from './CloudAnimation.module.css';

export default function CloudAnimation() {
  return (
    <div className={styles.cloudContainer}>
      <div className={styles.cloud}></div>
      <div className={styles.cloud}></div>
      <div className={styles.cloud}></div>
    </div>
  );
}