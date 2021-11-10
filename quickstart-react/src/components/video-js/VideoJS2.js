import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./Video.css";

const VideoJS2 = ({ src, onReady }) => {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    loop: true,
    sources: [
      {
        src: src,
        // type: ‘video/mp4’
      },
    ],
  };
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(
        videoElement,
        videoJsOptions,
        () => {
          console.log("readyyyy");
          onReady && onReady(player);
        }
      ));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [videoJsOptions]);
  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);
  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        controls
        width="640"
        height="268"
        preload="auto"
        data-setup='{ "playbackRates": [0.5, 1, 1.5, 2, 4] }'
      />
    </div>
  );
};
export default VideoJS2;
