import { useEffect, useState } from "react";
import { useVideo } from "../player/useVideo";
import styles from "./Info.module.css";

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${minutes ?? ""}:${seconds}`;
}

export const Info: React.FC = () => {
  const { video } = useVideo();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    video?.addEventListener("timeupdate", () => {
      setCurrentTime(video.currentTime);
    });
    video?.addEventListener("loadedmetadata", () => {
      setDuration(video.duration);
    });
  }, [video]);

  const [name, setName] = useState("");
  const [description, setDescirption] = useState("");
  useEffect(() => {
    console.log(video?.title);
  }, [video]);
  return (
    <div className={styles.container}>
      <div className={styles.names}>
        <div className={styles.title}>Macbeth Darla</div>
        <div className={styles.description}>Part 2</div>
      </div>
      <div className={styles.time}>{`${formatTime(currentTime)} : ${formatTime(
        duration
      )}`}</div>
    </div>
  );
};
