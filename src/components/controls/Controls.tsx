import { useCallback, useContext, useEffect, useState } from "react";
import {
  Backward,
  Forward,
  Fullscreen,
  More,
  Play,
  Subtitle,
  Volume,
} from "../../icons";
import { PlayerContext } from "../player/Player";
import styles from "./Controls.module.css";
import { useVideo } from "../player/useVideo";

enum VIDEO_STATUS {
  LOADING = "LOADING",

  PLAYING = "PLAYING",

  PAUSE = "PAUSE",

  UNKNOWN = "UNKNOWN",

  ERROR = "ERROR",

  ENDED = "ENDED",

  SEEKING = "SEEKING",

  WAITING = "WAITING",
}

export const Controls: React.FC = () => {
  const [status, setStatus] = useState<VIDEO_STATUS>(VIDEO_STATUS.PLAYING);
  const { video } = useVideo();

  useEffect(() => {
    if (!video) return;
    video.addEventListener("play", () => {
      console.log("video", video);
      setStatus(VIDEO_STATUS.PLAYING);
    });
    
    video.addEventListener("pause", () => {
      setStatus(VIDEO_STATUS.PAUSE);
      console.log("video", "pause");
    });
    
    video.addEventListener("waiting", () => {
      setStatus(VIDEO_STATUS.WAITING);
    });
    
    video.addEventListener("error", () => {
      console.log("video", video);
      setStatus(VIDEO_STATUS.ERROR);
    });
    
    video.addEventListener("ended", () => {
      console.log("video", video);
      setStatus(VIDEO_STATUS.ENDED);
    });
    
    video.addEventListener("seeking", () => {
      console.log("video", video);
      setStatus(VIDEO_STATUS.SEEKING);
    });
  }, [video, setStatus]);
  const playButtonHandler = useCallback(() => {
    console.log("status", status);
    switch (status) {
      case VIDEO_STATUS.PLAYING:
        video.pause();
        break;

      case VIDEO_STATUS.PAUSE:
        console.log("hello");
        video.play();
        break;

      case VIDEO_STATUS.ENDED:
      case VIDEO_STATUS.ERROR:
      case VIDEO_STATUS.UNKNOWN:
        video.play();
        break;
    }
  }, [status, video]);

  useEffect(() => {
    video?.addEventListener("click", playButtonHandler);
  }, [video]);

  useEffect(() => {
    console.log("status", status);
  }, [status]);
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
