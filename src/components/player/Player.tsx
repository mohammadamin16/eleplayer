import { Controller } from "../controller/Controller";
import styles from "./Player.module.css";

export const Player: React.FC = () => {
  return (
    <div className={styles.contaienr}>
      <video />
      <Controller />
    </div>
  );
};
