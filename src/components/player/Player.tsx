import { Controller } from "../controller/Controller";
import styles from "./Player.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../index";

const testUrl =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
export const PlayerContext = React.createContext<{
  videoElement: HTMLVideoElement | null;
}>(null);

export const Player: React.FC = () => {
  const videoSrc = useSelector((state: RootState) => state.main.videoUrl);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );
  useEffect(() => {
    if (videoRef.current) {
      setVideoElement(videoRef.current);
    }
  }, [videoRef]);
  return (
    <div className={styles.contaienr}>
      <video ref={videoRef} src={testUrl} muted autoPlay />
      <PlayerContext.Provider value={{ videoElement }}>
        <Controller />
      </PlayerContext.Provider>
    </div>
  );
};
