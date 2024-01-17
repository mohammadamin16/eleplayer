import { useContext } from "react";
import { PlayerContext } from "./Player";

export const useVideo = (): { video: HTMLVideoElement } => {
  const { videoElement } = useContext(PlayerContext);
  return { video: videoElement };
};
