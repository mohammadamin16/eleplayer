import {
  Backward,
  Forward,
  Fullscreen,
  More,
  Play,
  Subtitle,
  Volume,
} from "../../icons";
import styles from "./Controls.module.css";

export const Controls: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <Play />
        <Backward />
        <Forward />
      </div>
      <div className={styles.others}>
        <Volume />
        <Subtitle />
        <Fullscreen />
        <More />
      </div>
    </div>
  );
};
