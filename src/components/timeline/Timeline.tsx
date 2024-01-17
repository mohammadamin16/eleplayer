import { useEffect, useMemo, useRef, useState } from "react";
import { useVideo } from "../player/useVideo";
import styles from "./Timeline.module.css";
import { setThumbByTime } from "../../thumb";

export const Timeline: React.FC = () => {
  const { video } = useVideo();
  const [currentTime, setCurrentTime] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const thumbRef = useRef<HTMLImageElement>(null);

  const currentTimePercent = useMemo<number>(
    () => (currentTime / video?.duration) * 100,
    [currentTime, video]
  );
  const bufferedPercent = useMemo<number>(
    () => (buffered / video?.duration) * 100,
    [buffered, video]
  );

  const [showThumb, setShowThumb] = useState(false);
  const fakeVideoPlayer = useRef<HTMLVideoElement>(null);
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
    if (!thumbRef.current || !fakeVideoPlayer.current) return;
    thumbRef.current.style.left = `${e.clientX}px`;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const targetTime = percent * video.duration;
    setThumbByTime(targetTime, fakeVideoPlayer.current, thumbRef.current);
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
      <img
        ref={thumbRef}
        style={{ visibility: !showThumb ? "hidden" : "visible" }}
        className={styles.thumb}
      />
      <video
        src={video?.src}
        ref={fakeVideoPlayer}
        crossOrigin="anonymous"
        style={{
          zIndex: -1,
          border: "1px solid red",
          position: "fixed",
          top: "0",
          visibility: "hidden",
          left: "0",
          width: "50px",
          height: "50px",
        }}
      />
    </div>
  );
};
