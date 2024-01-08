import { Controls } from "../controls/Controls";
import { Info } from "../info/Info";
import { Timeline } from "../timeline/Timeline";
import styles from "./Controller.module.css";

export const Controller: React.FC = () => {
  return (
    <div className={styles.container}>
        <Info />
        <Timeline />
        <Controls />
    </div>
  );
};
