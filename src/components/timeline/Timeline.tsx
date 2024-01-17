import { useEffect, useMemo, useRef, useState } from "react";
import { useVideo } from "../player/useVideo";
import styles from "./Timeline.module.css";

export const Timeline: React.FC = () => {
  const { video } = useVideo();
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const currentTimePercent = useMemo<number>(
    () => (currentTime / video?.duration) * 100,
    [currentTime, video]
  );
  const bufferedPercent = useMemo<number>(
    () => (buffered / video?.duration) * 100,
    [buffered, video]
  );

  const [showThumb, setShowThumb] = useState(false);
  useEffect(() => {
    video?.addEventListener("timeupdate", () => {
      setCurrentTime(video.currentTime);
    });
    video?.addEventListener("progress", () => {
      const bufferedEnd = video?.buffered.end(video?.buffered.length - 1);
      setBuffered(bufferedEnd);
    });
  }, [video]);

  useEffect(() => {
    console.log(buffered);
  }, [buffered]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("enter", e);
    setShowThumb(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!thumbRef.current) return;
    thumbRef.current.style.left = `${e.clientX}px`;
    console.log("move", e);

    setShowThumb(true);
  };

  const handleMouseLeave = () => {
    setShowThumb(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
    console.log(video.currentTime);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleMouseDown}
    >
      <div className={styles.bar} />
      <div
        style={{ width: `${currentTimePercent}%` }}
        className={styles.progress}
      />
      <div style={{ width: `${bufferedPercent}%` }} className={styles.buffer} />
      <div style={{ left: `${currentTimePercent}%` }} className={styles.dot} />
      <div
        ref={thumbRef}
        style={{ visibility: !showThumb ? "hidden" : "visible" }}
        className={styles.thumb}
      />
    </div>
  );
};
