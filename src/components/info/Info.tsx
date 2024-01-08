import styles from "./Info.module.css";

export const Info: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.names}>
        <div className={styles.title}>Macbeth Darla</div>
        <div className={styles.description}>Part 2</div>
      </div>
      <div className={styles.time}>1:48 / 4:32</div>
    </div>
  );
};
