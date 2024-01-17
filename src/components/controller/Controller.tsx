import { Controls } from "../controls/Controls";
import { Info } from "../info/Info";
import { Timeline } from "../timeline/Timeline";
import styles from "./Controller.module.css";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../player/Player";
import { useVideo } from "../player/useVideo";

export const Controller: React.FC = () => {
  const { video } = useVideo();

  return (
    <div className={styles.container}>
      <Info />
      <Timeline />
      <Controls />
    </div>
  );
};
