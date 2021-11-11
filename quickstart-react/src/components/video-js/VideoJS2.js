import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./Video.css";
import mondaySdk from "monday-sdk-js";
import AnnotationComments from "@contently/videojs-annotation-comments";
import "@contently/videojs-annotation-comments/build/css/annotations.css";
videojs.registerPlugin("annotationComments", AnnotationComments(videojs));
const monday = mondaySdk();

const VideoJS2 = ({ src, onReady, index, itemid, userName }) => {


  const configurePlugin = (player, pluginOptions2, itemid, index) => {
    let plugin = player.annotationComments(pluginOptions2);
    plugin.onReady(() => {});
    plugin.registerListener("annotationDeleted", (event) => {
      plugin.fire("toggleAnnotationMode"); // toggle off
      plugin.fire("toggleAnnotationMode"); // toggle on
    });
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
  };

  let pluginOptions = {
    annotationsObjects: [],
    meta: { user_id: null, user_name: userName },
    bindArrowKeys: true,
    showControls: true,
    showCommentList: true,
    showFullScreen: true,
    showMarkerShapeAndTooltips: true,
    internalCommenting: true,
    startInAnnotationMode: true,
  };

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
    monday.storage.instance
      .getItem(itemid.toString() + "k" + index.toString())
      .then((res) => {
        let newPluginOptions = {
          ...pluginOptions,
          annotationsObjects:
            res.data.value === null ? [] : JSON.parse(res.data.value),
        };
        const videoElement = videoRef.current;
        if (!videoElement) return;
        const player = (playerRef.current = videojs(
          videoElement,
          videoJsOptions,
          () => {
            onReady && onReady(player);
            configurePlugin(player, newPluginOptions, itemid, index);
          }
        ));
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
