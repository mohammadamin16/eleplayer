const thumbCache: { [key: number]: any } = {};

export async function setThumbByTime(
  time: number,
  videoPlayer: HTMLVideoElement,
  thumbImg: HTMLImageElement
) {
  if (thumbCache[time]) {
    thumbImg.setAttribute("src", thumbCache[time]);
    return;
  }
  const dataURI = await getThumbByTime(time, videoPlayer);
  thumbImg.setAttribute("src", dataURI);

  thumbCache[time] = dataURI;
}

async function getThumbByTime(time: number, videoPlayer: HTMLVideoElement) {
  videoPlayer.currentTime = time;
  videoPlayer.pause();
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 180;

  await setVideoTime(videoPlayer, time);
  const context = canvas.getContext("2d");
  context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
  const dataURI = canvas.toDataURL("image/jpeg");
  return dataURI;
}

function setVideoTime(
  videoPlayer: HTMLVideoElement,
  targetTimeInSeconds: number
) {
  return new Promise<void>((resolve, reject) => {
    videoPlayer.currentTime = targetTimeInSeconds;

    videoPlayer.addEventListener("seeked", function onSeeked() {
      videoPlayer.removeEventListener("seeked", onSeeked);
      resolve();
    });
    const onLoadedData = () => {
      videoPlayer.removeEventListener("loadeddata", onLoadedData);
      reject();
    };

    videoPlayer.addEventListener("loadeddata", onLoadedData);

    videoPlayer.addEventListener("error", function onError(event) {
      videoPlayer.removeEventListener("loadeddata", onLoadedData);
      reject(event);
    });
  });
}
