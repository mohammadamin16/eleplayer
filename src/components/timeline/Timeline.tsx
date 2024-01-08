import styles from "./Timeline.module.css";

export const Timeline: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} />
      <div className={styles.progress} />
      <div className={styles.buffer} />
      <div className={styles.dot} />
      {/* <div className={styles.thumb} /> */}
    </div>
  );
};
