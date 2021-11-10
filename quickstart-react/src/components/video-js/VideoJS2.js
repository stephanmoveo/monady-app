import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./Video.css";
import mondaySdk from "monday-sdk-js";
import AnnotationComments from "@contently/videojs-annotation-comments";
import "@contently/videojs-annotation-comments/build/css/annotations.css";
videojs.registerPlugin("annotationComments", AnnotationComments(videojs));
const monday = mondaySdk();
let pluginOptions = {
  annotationsObjects: [],
  meta: { user_id: null, user_name: null },
  bindArrowKeys: true,
  showControls: true,
  showCommentList: true,
  showFullScreen: true,
  showMarkerShapeAndTooltips: true,
  internalCommenting: true,
  startInAnnotationMode: true,
};
const VideoJS2 = ({ src, onReady, index, itemid }) => {
  const [getComments, setGetComments] = React.useState([]);
  const [isUpdate, setisUpdate] = React.useState(false);

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
  //   const [plugin, setplugin] = React.useState()
  React.useEffect(() => {
    monday.storage.instance
      .getItem(itemid.toString() + "k" + index.toString())
      .then((res) => {
        let pluginOptions2 = {
          ...pluginOptions,
          annotationsObjects: res.data.value === null ? [] :JSON.parse(res.data.value),
        };
        console.log(pluginOptions2.annotationsObjects);

        let plugin;
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {
          const videoElement = videoRef.current;
          if (!videoElement) return;
          const player = (playerRef.current = videojs(
            videoElement,
            videoJsOptions,
            () => {
              console.log("plugin running");
              onReady && onReady(player);

              console.log("in player rerender");
              console.log(pluginOptions);
              plugin = player.annotationComments(pluginOptions2);
              plugin.onReady(() => {});
              plugin.registerListener("onStateChanged", (event) => {
                // event.detail = annotation state data
                monday.storage.instance
                  .setItem(
                    itemid.toString() + "k" + index.toString(),
                    JSON.stringify(event.detail)
                  )
                  .then((res) => {
                    console.log(res);
                  });
              });
            }
          ));
        } else {
          console.log("elseeee");
          console.log(pluginOptions);
          const player = playerRef.current;
          plugin = player.annotationComments(pluginOptions2);
          plugin.onReady(() => {});
          plugin.registerListener("onStateChanged", (event) => {
            monday.storage.instance
              .setItem(
                itemid.toString() + "k" + index.toString(),
                JSON.stringify(event.detail)
              )
              .then((res) => {
                console.log(res);
              });
          });
        }
      });
  }, [videoJsOptions]);
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
